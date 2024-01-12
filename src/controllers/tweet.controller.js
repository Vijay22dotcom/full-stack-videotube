import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async (req, res) => {
  //TODO: create tweet ✅
  const { content } = req.body;

  if (!content) {
    throw new ApiError(400, "please enter tweet");
  }

  const tweet = await Tweet.create({
    content,
    owner: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, tweet, "tweet submit successfully"));
});

const getUserTweets = asyncHandler(async (req, res) => {
  // TODO: get user tweets

  const { userId } = req.params;
  const tweets = await Tweet.find({ owner: userId });

  if (!tweets) {
    throw new ApiError(404, "no tweet found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, tweets, " fetch user  tweet  successfully"));
});

const updateTweet = asyncHandler(async (req, res) => {
  //TODO: update tweet  ✅
  const { tweetId } = req.params;
  const { content } = req.body;

  if (!content) {
    throw new ApiError(400, "please enter tweet");
  }

  const tweet = await Tweet.findByIdAndUpdate(
    tweetId,
    {
      $set: {
        content,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, tweet, "tweet update successfully"));
});

const deleteTweet = asyncHandler(async (req, res) => {
  //TODO: delete tweet ✅
  const { tweetId } = req.params;

  const tweet = await Tweet.findByIdAndDelete(tweetId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "tweet deleted successfully"));
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
