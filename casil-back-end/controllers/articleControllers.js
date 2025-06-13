const Article = require("../models/Article");

const getArticles = async (req, res) => {
  try {
    const articles = await Article.find({});
    res.json(articles);
  } catch (error) {``
    res.status(500).json({ message: "Server Error" });
  }
};

const getArticleByName = async (req, res) => {
  try {
    const article = await Article.findOne({ name: req.params.name });
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const createArticle = async (req, res) => {
  try {
    const { name, title, content } = req.body;
    const articleExists = await Article.findOne({ name });
    if (articleExists) {
      return res.status(400).json({ message: "Article with this name already exists" });
    }

    const article = new Article({
      name,
      title,
      content,
    });

    const createdArticle = await article.save();
    res.status(201).json(createdArticle);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const updateArticle = async (req, res) => {
  try {
    const { name, title, content } = req.body;
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    article.name = name || article.name;
    article.title = title || article.title;
    article.content = content || article.content;

    const updatedArticle = await article.save();
    res.json(updatedArticle);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    await article.remove();
    res.json({ message: "Article removed" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getArticles,
  getArticleByName,
  createArticle,
  updateArticle,
  deleteArticle,
};