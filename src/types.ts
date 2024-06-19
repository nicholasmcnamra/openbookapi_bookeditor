export interface Book {
    title: String;
    publishedYear: number;
    author: String;
    description: String;
    openLibraryid: String;
}

export interface RootState {
    books: BookState;
  }

export interface BookState {
    books: Book[];
  }