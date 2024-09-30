const { GetAllMovies, GetMoviesByID, createMovies, updateMovies, deleteMovies } = require("../controllers/MoviesController");
const router = require("express").Router();
  
router.get("/", GetAllMovies);
router.get("/:id", GetMoviesByID);
router.post("/create", createMovies);
router.put("/update/:id", updateMovies);
router.delete("/delete/:id", deleteMovies);
  
module.exports = router;