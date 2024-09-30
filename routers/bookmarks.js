const { createBookmarks, myBookmarks } = require("../controllers/BookmarksController");
const router = require("express").Router();
  
router.post("/:movieId", createBookmarks);
router.get("/mybookmark", myBookmarks);
  
module.exports = router;