import Article from "../models/articleSchema.js";

export const createArticle = async (req, res, next) => {
  try {
    const { title, content, category, tags } = req.body;
    const newArticle = new Article({
      title,
      content,
      category,
      tags,
      thumbnail: req.file ? req.file.filename : null,
    });
    await newArticle.save();
    res.status(200).json(newArticle);
  } catch (error) {
    next(error);
  }
};

export const fetchArticles = async (req, res, next) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 }).limit(2).skip(10);
    const articlesData = articles.map((article) => ({
      "id": article._id,
      "title": article.title,
      "content": article.content,
      "tags": article.tags,
      "category": article.category,
      "thumbnail": article.thumbnail,
      "createdAt": article.createdAt,
      "readingTime": article.readingTime,
    }))
    res.status(200).json(articlesData);
  } catch (error) {
    next(error);
  }
};

export const fetchArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).send("Article not found");
    }
    const articleData = {
      "id": article._id,
      "title": article.title,
      "content": article.content,
      "tags": article.tags,
      "category": article.category,
      "thumbnail": article.thumbnail,
      "createdAt": article.createdAt,
      "readingTime": article.readingTime,
    }
    res.status(200).json(articleData);
  } catch (error) {
    next(error);
  }
};

export const updateArticle = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;

    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).send("Article not found");
    }

    const updatedData = {
      title: title || article.title,
      content: content || article.content,
      tags: tags || article.tags,
      thumbnail: req.file ? req.file.filename : article.thumbnail,
    };

    await Article.findByIdAndUpdate(req.params.id, updatedData, { returnDocument: "after" });

    res.status(200).send("successful");
  } catch (error) {
    next(error);
  }
};

export const deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).send("Article not found");
    }
    await article.deleteOne();
    res.status(200).send("successful");
  } catch (error) {
    next(error);
  }
};
