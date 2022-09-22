const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const users = require('./users');
const movies = require('./movies');
const { createUser, login } = require('../controllers/users');
const auth = require('../middleware/auth');
const NotFound = require('../errors/notFound');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required(),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required(),
  }),
}), createUser);

router.use('/users', auth, users);
router.use('/movies', auth, movies);
router.use('*', (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

module.exports = router;
