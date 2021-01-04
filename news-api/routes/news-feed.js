const express = require("express");
const { body } = require("express-validator/check");
const router = express.Router();
const newsController = require("../controllers/news-feed");
const isAuth = require('../middleware/is-auth');
//GET news/feeds
router.get("/feeds",isAuth, newsController.getNews);
router.get("/feed/:feedId",isAuth, newsController.getFeed);
router.post(
  "/feed",
  isAuth,
  [
    body("title").trim().isString().isLength({ min: 4 }),
    body("content").trim().isString().isLength({ min: 5 }),
  ],
  newsController.postFeed
);
router.put(
  "/feed/:feedId",
  isAuth,
  [
    body("title").trim().isString().isLength({ min: 4 }),
    body("content").trim().isString().isLength({ min: 5 }),
  ],
  newsController.updateFeed
);

router.delete("/feed/:feedId", isAuth, newsController.deleteFeed);

module.exports = router;
