const { Joi } = require('celebrate');

const regexUrl = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/i;
const regexPassword = /[a-zA-Z0-9]{3,30}/;

const registerValidation = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().regex(regexPassword).required(),
  }),
};

const loginValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().regex(regexPassword).required(),
  }),
};

const createArticleValidation = {
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().regex(regexUrl),
    image: Joi.string().required().regex(regexUrl),
  }),
};

const articleIdValidation = {
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24),
  }),
};

module.exports = {
  regexUrl,
  registerValidation,
  loginValidation,
  createArticleValidation,
  articleIdValidation,
};
