import Article from "../models/articleSchema.js";

export const deleteArticles = async (req, res, next) => {
  try {
    const users = await Article.deleteMany({});
    res.status(200).json({ message: "All articles deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete articles" });
  }
};

export const createArticle = async (req, res, next) => {
  try {
    const { title, content, category, tags } = req.body;
    const newArticle = new Article({
      title,
      content,
      category,
      tags,
      thumbnail: req.file
        ? {
            url: req.file.path,
            publicId: req.file.filename,
          }
        : null,
    });
    await newArticle.save();
    res.status(200).json(newArticle);
  } catch (error) {
    next(error);
  }
};

export const fetchArticles = async (req, res, next) => {
  try {
    const articlesLength = await Article.countDocuments();
    const page = parseInt(req.query.page || 1);
    const category = req.query.category;
    const limit = 9;
    const articles = await Article.find(category ? { category } : {})
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);
    const articlesData = articles.map((article) => ({
      id: article._id,
      title: article.title,
      content: article.content,
      tags: article.tags,
      category: article.category,
      thumbnail: article.thumbnail,
      createdAt: article.createdAt,
      readingTime: article.readingTime,
      slug: article.slug,
    }));
    res.status(200).json({
      articles: articlesData,
      totalArticles: articlesLength,
      totalPages: Math.ceil(articlesLength / 10),
    });
  } catch (error) {
    next(error);
  }
};

export const fetchArticle = async (req, res, next) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) {
      return res.status(404).send("Article not found");
    }

    const articleData = {
      id: article._id,
      title: article.title,
      content: article.content,
      tags: article.tags,
      category: article.category,
      thumbnail: article.thumbnail.url || "",
      createdAt: article.createdAt,
      readingTime: article.readingTime,
      slug: article.slug,
    };

    const relatedArticles = await Article.find({
      category: articleData.category,
      _id: { $ne: articleData.id },
    });

    const relatedArticlesData = relatedArticles.map((article) => ({
      id: article._id,
      title: article.title,
      content: article.content,
      tags: article.tags,
      category: article.category,
      thumbnail: article.thumbnail,
      createdAt: article.createdAt,
      readingTime: article.readingTime,
      slug: article.slug,
    }));

    res.status(200).json({ articleData, relatedArticlesData });
  } catch (error) {
    next(error);
  }
};

export const updateArticle = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) {
      return res.status(404).send("Article not found");
    }

    const updatedData = {
      title: title || article.title,
      content: content || article.content,
      tags: tags || article.tags,
      thumbnail: req.file
        ? {
            url: req.file.path,
            publicId: req.file.filename,
          }
        : article.thumbnail,
    };

    await Article.findOneAndUpdate({ slug: req.params.slug }, updatedData, {
      returnDocument: "after",
    });
    res.status(200).send("successful");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) {
      return res.status(404).send("Article not found");
    }
    await article.deleteOne();
    res.status(200).send("successful");
  } catch (error) {
    next(error);
  }
};

export const renderArticlePage = async (req, res, next) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) {
      return res.status(404).send("Article not found");
    }

    const metadata = {
      title: article.title,
      description: article.description,
      image: article.thumbnail.url,
      url: `https://notes-app-v944.vercel.app/articles/${article.slug}`,
      type: "article",
      siteName: "WatchMann News",
      locale: "en_NG",
      publishedTime: article.createdAt,
      modifiedTime: article.updatedAt,
      section: article.category,
    };
    res.status(200).render("index", { metadata });
  } catch (error) {
    next(error);
  }
};
