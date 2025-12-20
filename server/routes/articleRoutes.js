const express = require('express');
const router = express.Router();
const { getAllArticles, createArticle, getArticleById, getMyArticles, deleteArticle, updateArticle } = require('../controllers/articleController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getAllArticles)       // PUBLIC: No 'protect' here. Anyone can read.
  .post(protect, createArticle);

router.get('/mine', protect, getMyArticles);

// Single article operations
router.route('/:id')
  .get(getArticleById)
  .delete(protect, deleteArticle) // Protected delete
  .put(protect, updateArticle);



module.exports = router;