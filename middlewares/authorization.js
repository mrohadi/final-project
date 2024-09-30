const { movies } = require('../models');

function authorization(req, res, next){
    const movieId = req.param.id;
    const authenticatedUser = res.locals.user;

    movies.findOne({
        where: {
            id: movieId
        }
    })
    .then(movie => {
        if (!movie){
            return res.status(404).json({
                name: "Data Not Found",
                devMessage: `Photo with id "${movieId}" not found`
            });
        }
        if (movie.id === authenticatedUser.id){
            return next();
        }else{
            return res.status(403).json({
                name: "Authorization Error",
                devMessage: `User with id "${authenticatedUser.id}" does not have permission to access Movie with id "${movieId}"`
            });
        }
    })
    .catch(err => {
        return res.status(500).json(err);
    })
}

module.exports = authorization