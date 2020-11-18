const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getArticles = (req, res, next) => Article.find({})
  .populate(['owner'])
  .then((articles) => res.status(200).send(articles))
  .catch(next)

module.exports.createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;

  return Article.create({ keyword, title, text, date, source, link, image, owner: req.user._id })
    .then((newArticle) => res.status(200).send(newArticle))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные');
      }
    })
    .catch(next)
}

module.exports.deleteArticle = (req, res, next) => Article.findById(req.params.articleId)
  .orFail(new Error('CastError'))
  .then((article) => {
    if (article.owner.equals(req.user._id)) {
      Article.findByIdAndRemove(req.params.articleId)
        .then((currentArticle) => res.status(200).send(currentArticle))
        .catch((err) => console.log(err));
    } else {
      throw new ForbiddenError('Недостаточно прав для данной операции');
    }
  })
  .catch((err) => {
    if (err.message === 'CastError') {
      throw new NotFoundError('Статья или пользователь не найден');
    }
    if (err.statusCode === 403) {
      throw new ForbiddenError('Недостаточно прав для данной операции');
    }
  })
  .catch(next)