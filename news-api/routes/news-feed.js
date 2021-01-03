const express = require("express");
const { body } = require("express-validator/check");
const router = express.Router();
const newsController = require("../controllers/news-feed");
//GET news/feeds
router.get("/feeds", newsController.getNews);
router.get('/Feed/:feedId',newsController.getFeed);
router.post(
  "/feed",
  [
    body("title").trim().isAlphanumeric().isLength({ min: 4 }),
    body("content").trim().isString().isLength({ min: 5 }),
  ],
  newsController.postFeed
);
 
module.exports = router;
 