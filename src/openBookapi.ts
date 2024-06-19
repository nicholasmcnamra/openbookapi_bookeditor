import axios from 'axios';
import { Book } from './types';

export const fetchBookData = async (openLibraryId: string): Promise<Book | null> => {
    try {
        //api call fo title(T), description(D), openLibraryid(O)
        const responseTDO = await axios.get(`https://openlibrary.org/works/${openLibraryId}.json`);
        const data = responseTDO.data;
        // api call for Author(A) and publishedYear(Y)
        const responseAY = await axios.get(`https://openlibrary.org/search.json?q=${openLibraryId}`);
        const dataAY = responseAY.data;

        const book: Book = {
            title: data.title,
            publishedYear: dataAY.docs[0].first_publish_year,
            author: dataAY.docs[0].author_name[0],
            description: data.description,
            openLibraryid: openLibraryId,
        };
        return book;
    } catch (error) {
        console.error("Failed to fetch book data:", error);
        return null;
    }
};