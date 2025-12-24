const Book = require('../models/Book');

// Create a new book
const createBook = async (req, res, next) => {
  try {
    const payload = req.body;
    const book = new Book(payload);
    await book.save();
    return res.status(201).json({ message: 'Book created', book });
  } catch (err) {
    next(err);
  }
};

//Get all books with optional query: ?q=searchTerm & page= & limit= & genre= & author=

const getBooks = async (req, res, next) => {
  try {
    const { q, page = 1, limit = 10, genre, author } = req.query;
    const filter = {};

    if (q) {
      const regex = new RegExp(q, 'i');
      filter.$or = [{ title: regex }, { description: regex }, { authors: regex }, { isbn: regex }];
    }
    if (genre) filter.genres = genre;
    if (author) filter.authors = author;

    const skip = (Math.max(parseInt(page, 10), 1) - 1) * Math.max(parseInt(limit, 10), 1);
    const total = await Book.countDocuments(filter);
    const books = await Book.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit, 10));

    return res.json({
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / limit),
      books
    });
  } catch (err) {
    next(err);
  }
};


  // Get single book by id
 
const getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    return res.json(book);
  } catch (err) {
    next(err);
  }
};

// Update a book
const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const book = await Book.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    return res.json({ message: 'Book updated', book });
  } catch (err) {
    next(err);
  }
};

// Delete a book
const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndRemove(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    return res.json({ message: 'Book deleted', book });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook
};
