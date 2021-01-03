const fs =require('fs');
const path = require("path");
const mainPath=require('../Util/path');
const { validationResult } = require("express-validator/check");
const Feed = require("../models/feed");
exports.getNews = (req, res, next) => {
  Feed.find()
    .then((feeds) => {
      console.log("feed");
      res.status(200).json({
        message: "News-Feeds Fetched successfully!",
        feed: feeds,
      });
    })
    .catch((err) => {
      if ((!err, statusCode)) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.postFeed = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const error = new Error("Entered Data is incorrect");
    error.statusCode = 422;
    throw error;
  }
  if (!req.file) {
    const error = new Error("No image provided");
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = req.file.path;
  const feed = new Feed({
    title: title,
    content: content,
    imageUrl: imageUrl,
  });
  feed
    .save()
    .then((result) => {
      res.status(201).json({
        message: "News-Feed created successfully!",
        feed: result,
      });
    })
    .catch((err) => {
      if ((!err, statusCode)) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.getFeed = (req, res, next) => {
  const feedId = req.params.feedId;
  Feed.findById(feedId)
    .then((feed) => {
      if (!feed) {
        const error = new Error("Could not find News-Feed");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: "News-Feed Found",
        feed: feed,
      });
    })
    .catch((err) => {
      if ((!err, statusCode)) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.updateFeed = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const error = new Error("Entered Data is incorrect");
    error.statusCode = 422;
    throw error;
  }
  const feedId = req.params.feedId;
  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.body.image;
  if (req.file) {
    imageUrl = req.file.path;
  }
  if (!imageUrl) {
    const error = new Error("No image picked");
    error.statusCode = 422;
    throw error;
  }
  Feed.findById(feedId)
    .then((feed) => {
      if (!feed) {
        const error = new Error("Could not find News-Feed");
        error.statusCode = 404;
        throw error;
			}
			if(imageUrl!==feed.imageUrl){
				clearImage(feed.imageUrl);
			}
			feed.title=title; 
			feed.content=content; 
			feed.imageUrl=imageUrl; 
			return feed.save();
		})
		.then(result=>{
			res.status(200).json({
				message:'News-Feed Updated',
				feed:result,
			})
		})
    .catch((err) => {
      if ((!err, statusCode)) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.deleteFeed=(req,res,next)=>{
	const feedId=req.params.feedId;
	Feed.findById(feedId)
    .then(feed=>{
			clearImage(feed.imageUrl);
			if (!feed) {
        const error = new Error("Could not find News-Feed");
        error.statusCode = 404;
        throw error;
			}
			return Feed.findByIdAndRemove(feedId);
		})
		.then(result=>{
			res.status(200).json({
				message:'Deleted News-Feed',
			});
		})
    .catch((err) => {
      if ((!err, statusCode)) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const clearImage=filePath=>{
	filePath=path.join(mainPath,filePath);
	fs.unlink(filePath,err=>console.log(err));
};
