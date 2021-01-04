const { validationResult } = require("express-validator/check");
const Category = require("../models/category");


exports.getCategorys = (req, res, next) => {

  Category.find()
    .then((categorys) => {
      console.log("categorys");
      res.status(200).json({
        message: "Categorys Fetched successfully!",
        categorys: categorys,
      });
    })
    .catch((err) => {
      if ((!err, statusCode)) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postCategory = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const error = new Error("Entered Data is incorrect");
    error.statusCode = 422;
    throw error;
  }
  const name = req.body.name;
  const description = req.body.description;
      const category = new Category({
				name: name,
				description:description,
      });
      return category.save()
    .then((result) => {
      res.status(201).json({ message: "Category Created !", CategoryId: result._id });
    })
    .catch((err) => {
      if ((!err.statusCode)) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.updateCategory = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const error = new Error("Entered Data is incorrect");
    error.statusCode = 422;
    throw error;
  }
  const categoryId = req.params.categoryId;
  const name = req.body.name;
  const description = req.body.description;
  Category.findById(categoryId)
    .then((category) => {
      if (!category) {
        const error = new Error("Could not find Category");
        error.statusCode = 404;
        throw error;
      }
      category.name = name;
      category.description = description;
      return category.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Category Updated",
        category: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.deleteCategory = (req, res, next) => {
  const categoryId = req.params.categoryId;
  Category.findById(categoryId)
    .then((category) => {
      if (!category) {
        const error = new Error("Could not find Category");
        error.statusCode = 404;
        throw error;
      }
      return Category.findByIdAndRemove(categoryId);
    })
    .then((result) => {
      res.status(200).json({
        message: "Deleted Category",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};