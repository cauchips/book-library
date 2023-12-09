const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_ujian_pweb'
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

// Create Book
app.post('/books', (req, res) => {
    const { title, author, genre } = req.body;
    const query = 'INSERT INTO books (title, author, genre) VALUES (?, ?, ?)';
    db.query(query, [title, author, genre], (err, result) => {
      if (err) throw err;
      res.json({ message: 'Book created successfully', bookId: result.insertId });
    });
  });
  // Read Books
  app.get('/books', (req, res) => {
    const query = 'SELECT * FROM books';
    db.query(query, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });
  // Update Book
  app.put('/books/:id', (req, res) => {
    const { title, author, genre } = req.body;
    const { id } = req.params;
    const query = 'UPDATE books SET title=?, author=?, genre=? WHERE id=?';
    db.query(query, [title, author, genre, id], (err, result) => {
      if (err) throw err;
      res.json({ message: 'Book updated successfully' });
    });
  });
  // Delete Book
  app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM books WHERE id=?';
    db.query(query, [id], (err, result) => {
      if (err) throw err;
      res.json({ message: 'Book deleted successfully' });
    });
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
