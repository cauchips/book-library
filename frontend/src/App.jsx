import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    genre: ''
  });
  const [editBook, setEditBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios.get('http://localhost:3001/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  };

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (editBook) {
      setEditBook({
        ...editBook,
        [name]: value
      });
    } else {
      setNewBook({
        ...newBook,
        [name]: value
      });
    }
  };

  const handleAddBook = () => {
    axios.post('http://localhost:3001/books', newBook)
      .then(response => {
        setBooks([...books, { id: response.data.bookId, ...newBook }]);
        setNewBook({
          title: '',
          author: '',
          genre: ''
        });
      })
      .catch(error => console.error('Error adding book:', error));
  };

  const handleEditBook = (book) => {
    setEditBook(book);
  };

  const handleUpdateBook = () => {
    const { id, title, author, genre } = editBook;
    axios.put(`http://localhost:3001/books/${id}`, { title, author, genre })
      .then(() => {
        fetchBooks();
        setEditBook(null);
      })
      .catch(error => console.error('Error updating book:', error));
  };

  const handleDeleteBook = (id) => {
    axios.delete(`http://localhost:3001/books/${id}`)
      .then(() => {
        setBooks(books.filter(book => book.id !== id));
      })
      .catch(error => console.error('Error deleting book:', error));
  };

  const cancelEdit = () => {
    setEditBook(null);
  };

  return (
    <div className="app-container">
      <h1>Book Library</h1>
      <ul>
        {books.map(book => (
          <li key={book.id} className={editBook?.id === book.id ? 'edit-mode' : ''}>
            {editBook?.id === book.id ? (
              <>
                <input type="text" name="title" value={editBook.title} onChange={handleInputChange} />
                <input type="text" name="author" value={editBook.author} onChange={handleInputChange} />
                <input type="text" name="genre" value={editBook.genre} onChange={handleInputChange} />
                <button onClick={handleUpdateBook}>Update</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <div className="book-info">
                  <div><strong>Title:</strong> {book.title}</div>
                  <div><strong>Author:</strong> {book.author}</div>
                  <div><strong>Genre:</strong> {book.genre}</div>
                </div>
                <div className="actions">
                  <button onClick={() => handleEditBook(book)}>Edit</button>
                  <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      {!editBook && (
        <div className="add-book-container">
          <h2>Add New Book</h2>
          <div>
            <label>Title:</label>
            <input type="text" name="title" value={newBook.title} onChange={handleInputChange} />
          </div>
          <div>
            <label>Author:</label>
            <input type="text" name="author" value={newBook.author} onChange={handleInputChange} />
          </div>
          <div>
            <label>Genre:</label>
            <input type="text" name="genre" value={newBook.genre} onChange={handleInputChange} />
          </div>
          <button onClick={handleAddBook}>Add Book</button>
        </div>
      )}
    </div>
  );
}

export default App;
