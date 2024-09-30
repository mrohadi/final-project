const { movies } = require('../models');

exports.GetAllMovies = async (req, res, next) => {
    try {
      const tempMovie = await movies.findAll();
      res.status(200).json(tempMovie);
    } catch (error) {
      next(error);
    }
};

exports.GetMoviesByID = async (req, res, next) => {
    const { id } = req.params;
    try {
      const tempMovie = await movies.findByPk(id);
      if (!tempMovie) throw new NotFoundError();
      res.status(200).json(tempMovie);
    } catch (error) {
      next(error);
    }
};

exports.createMovies = async (req, res, next) => {
    const { title, synopsis, trailerUrl, imgUrl, rating, status } = req.body;
    try {
      const tempMovie = await movies.create({ title, synopsis, trailerUrl, imgUrl, rating, status });
      res.status(201).json(tempMovie);
    } catch (error) {
      next(error);
    }
};

exports.updateMovies = async (req, res, next) => {
    const { id } = req.params;
    const { title, synopsis, trailerUrl, imgUrl, rating, status } = req.body;
    try {
      const tempMovie = await movies.findByPk(id);
      if (!tempMovie) throw new NotFoundError();
      await tempMovie.update({ title, synopsis, trailerUrl, imgUrl, rating, status });
      res.status(200).json(tempMovie);
    } catch (error) {
      next(error);
    }
};

exports.deleteMovies = async (req, res, next) => {
    const { id } = req.params;
    try {
      const tempMovie = await movies.findByPk(id);
      if (!tempMovie) throw new NotFoundError();
      await tempMovie.destroy();
      res.status(200).json({ message: "Product has been deleted" });
    } catch (error) {
      next(error);
    }
};