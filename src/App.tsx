import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import {store} from "./Redux/store"; 
import BookList from "./Components/BookList";
import AddNewBook from "./Components/AddNewBook";
import './App.css';


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/books/add" element={<AddNewBook />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;