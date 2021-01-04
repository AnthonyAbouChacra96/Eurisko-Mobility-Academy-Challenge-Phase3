const express = require("express");
const { body } = require("express-validator/check");
const router = express.Router();
const newsController = require("../controllers/news-feed");
const categoryController = require("../controllers/category");
const isAuth = require('../middleware/is-auth');
//GET news/feeds
router.get("/feeds",isAuth, newsController.getNews);
router.get("/feed/:feedId",isAuth, newsController.getFeed);
router.get("/feed/category/:categoryId",isAuth,newsController.getFeedByCategoryId);
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

router.get('/category',isAuth,categoryController.getCategorys);
router.post('/category',isAuth,
  [
    body("name").trim().isString().isLength({ min: 4 }),
    body("description").trim().isString().isLength({ min: 5 }),
  ],categoryController.postCategory);
router.put(
  "/category/:categoryId",
  isAuth,
  [
    body("name").trim().isString().isLength({ min: 4 }),
    body("description").trim().isString().isLength({ min: 5 }),
  ],
  categoryController.updateCategory
);
router.delete("/category/:categoryId", isAuth, categoryController.deleteCategory);
module.exports = router;
