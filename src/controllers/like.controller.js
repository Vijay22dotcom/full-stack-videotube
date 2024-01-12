import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: toggle like on video ✅

  const isLiked = await Like.findOne({
    $and: [
      { likedBy: new mongoose.Types.ObjectId(req.user._id) },
      { video: new mongoose.Types.ObjectId(videoId) },
    ],
  });

  if (!isLiked) {
    const like = await Like.create({
      video: videoId,
      likedBy: req.user._id,
    });

    if (!like) {
      throw new ApiError(
        500,
        "something went wrong while toggle like on video"
      );
    }
  } else {
    const like = await Like.findByIdAndDelete(isLiked._id);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "video like toggle successfully"));
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  //TODO: toggle like on comment ✅
  const isLiked = await Like.findOne({
    $and: [
      { likedBy: new mongoose.Types.ObjectId(req.user._id) },
      { comment: new mongoose.Types.ObjectId(commentId) },
    ],
  });
  // console.log(isLiked);

  if (!isLiked) {
    const tweet = await Like.create({
      comment: commentId,
      likedBy: req.user._id,
    });

    if (!tweet) {
      throw new ApiError(
        500,
        "something went wrong while toggle like on video"
      );
    }
  } else {
    const comment = await Like.findByIdAndDelete(isLiked._id);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "comment like toggle successfully"));
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  //TODO: toggle like on tweet ✅

  const isLiked = await Like.findOne({
    $and: [
      { likedBy: new mongoose.Types.ObjectId(req.user._id) },
      { tweet: new mongoose.Types.ObjectId(tweetId) },
    ],
  });
  // console.log(isLiked);

  if (!isLiked) {
    const tweet = await Like.create({
      tweet: tweetId,
      likedBy: req.user._id,
    });

    if (!tweet) {
      throw new ApiError(
        500,
        "something went wrong while toggle like on video"
      );
    }
  } else {
    const tweet = await Like.findByIdAndDelete(isLiked._id);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "tweet like toggle successfully"));
});

const getLikedVideos = asyncHandler(async (req, res) => {
  //TODO: get all liked videos ✅

  const videos = await Like.aggregate([
    { $match: { likedBy: new mongoose.Types.ObjectId(req.user._id) } },
    { $match: { video: { $exists: true } } },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, videos, "liked videos fetch successfully"));
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
