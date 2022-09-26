const router = require('express').Router();
const { getMovies, createMovies, deleteMovies } = require('../controllers/movies');
const { moviesCreateValidate, deleteMovieValidate } = require('../middleware/validate');

router.get('', getMovies);

router.post('', moviesCreateValidate, createMovies);

router.delete('/:movieId', deleteMovieValidate, deleteMovies);

module.exports = router;
