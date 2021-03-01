const router = require('express').Router();
const { celebrate } = require('celebrate');
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
const { articleIdValidation, createArticleValidation } = require('../middlewares/validation');

router.get('/articles', getArticles);

router.post('/articles', celebrate(createArticleValidation), createArticle);

router.delete('/articles/:articleId', celebrate(articleIdValidation), deleteArticle);

module.exports = router;
