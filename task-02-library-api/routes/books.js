const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Create a book
router.post('/createbook', bookController.createBook);

// Read: get all books (with query support)
router.get('/getbooks', bookController.getBooks);

// Read: get one book by id
router.get('/getbooks/:id', bookController.getBookById);

// Update a book
router.put('/updatebooks/:id', bookController.updateBook);

// Delete a book
router.delete('/deletebooks/:id', bookController.deleteBook);

module.exports = router;
