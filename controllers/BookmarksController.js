const { bookmarks } = require('../models');
const { movies } = require('../models');
const { Op } = require('sequelize');

exports.createBookmarks = async (req, res, next) => {
    const { movieId } = req.params;
    const user = res.locals.user;
    let userId = user.id;    
    try {
      const tempBookmark = await bookmarks.create({ movieId, userId });
      const tempMovie = await movies.findByPk(movieId);
      if (!tempMovie) throw new NotFoundError();
      let response = {
        message: "Success adding new bookmark",
        id: tempBookmark.id,
        userId: tempBookmark.userId,
        movieId: tempBookmark.movieId,
        movieTitle: tempMovie.title
    }
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
};

exports.myBookmarks = async (req, res, next) => {
    const user = res.locals.user;
    let userId = user.id;    
    try {
      const tempBookmark = await bookmarks.findAll({
        attributes: ['movieId'],
        where:{
            userId: userId
        }
      });
      let tempMovieId = [];
      for (let i = 0; i < tempBookmark.length; i++){
        tempMovieId.push(tempBookmark[i].movieId);
      }  
      const tempMovie = await movies.findAll({
        where:{
            id: {
                [Op.in]: tempMovieId
            }
        }
      });
      res.status(201).json(tempMovie);
    } catch (error) {
      next(error);
    }
};