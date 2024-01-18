import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscription.model.js";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

const getChannelStats = asyncHandler(async (req, res) => {
  // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc. ✅

  const channelStats = await User.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(req.user._id) } },
    {
      $lookup: {
        from: "videos",

        localField: "_id",
        foreignField: "owner",
        as: "allVideo",
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "_id",
        foreignField: "owner",
        as: "videos",
        pipeline: [
          {
            $lookup: {
              from: "likes",
              localField: "_id",
              foreignField: "video",
              as: "likes",
            },
          },
          {
            $addFields: {
              likesCount: { $size: "$likes" },
            },
          },

          {
            $group: {
              _id: null,
              totalViews: { $sum: "$views" },
              totalLike: { $sum: "$likesCount" },
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "channel",
        as: "subscribers",
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscriber",
        as: "subscribedTo",
      },
    },
    {
      $addFields: {
        subscribersCount: {
          $size: "$subscribers",
        },
        channelsSubscribedToCount: {
          $size: "$subscribedTo",
        },
        totalVideo: {
          $size: "$allVideo",
        },
      },
    },

    {
      $project: {
        subscribersCount: 1,
        channelsSubscribedToCount: 1,
        totalVideo: 1,
        videos: 1,
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(200, channelStats, "channelStats fetch successfully")
    );
});

const getChannelVideos = asyncHandler(async (req, res) => {
  // TODO: Get all the videos uploaded by the channel ✅
  const videos = await Video.find({
    owner: new mongoose.Types.ObjectId(req.user._id),
  });

  if (!videos) {
    throw new ApiError(404, "no video found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, videos, "channel videos fetch successfully"));
});

export { getChannelStats, getChannelVideos };
