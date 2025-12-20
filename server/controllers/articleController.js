const Article = require('../models/Article');
const User = require('../models/User'); 


const getAllArticles = async (req, res) => {
  try {
   
    const articles = await Article.find()
        .populate('user', 'firstName lastName') 
        .sort({ createdAt: -1 });

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createArticle = async (req, res) => {
  try {
    // Check for all 3 fields now
    if (!req.body.title || !req.body.content || !req.body.author) {
      return res.status(400).json({ message: 'Please add title, author, and content' });
    }

    const article = await Article.create({
      title: req.body.title,
      author: req.body.author, // <--- Add this
      content: req.body.content,
      user: req.user.id,
    });

    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate('user', 'firstName lastName');
    
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ message: 'Story not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyArticles = async (req, res) => {
  try {
    const articles = await Article.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete story
// @route   DELETE /api/articles/:id
const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Check user ownership
    if (article.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await article.deleteOne();
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update story
// @route   PUT /api/articles/:id
const updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Check user ownership
    if (article.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated version
    );

    res.status(200).json(updatedArticle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllArticles, createArticle, getArticleById, getMyArticles, deleteArticle, updateArticle };