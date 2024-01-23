import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  uploadOnClouldinary,
  deleteImageOnClouldinary,
  deleteVideoOnClouldinary,
} from "../utils/couldinarry.js";

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  //TODO: get all videos based on query, sort, pagination

  const videos = await Video.aggregate([
    { $match: {} },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [
          {
            $project: {
              name: 1,
              avatar: 1,
              username: 1,
              _id: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        owner: { $arrayElemAt: ["$owner", 0] },
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, videos, "videos featch successfully"));
});

// const getAllVideos = asyncHandler(async (req, res) => {
//   const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
//   //TODO: get all videos based on query, sort, pagination

//   const videos = await Video.find();

//   return res
//     .status(200)
//     .json(new ApiResponse(200, videos, "videos featch successfully"));
// })

const publishAVideo = asyncHandler(async (req, res) => {
  // TODO: get video, upload to cloudinary, create video ✅
  const { title, description } = req.body;
  // console.log(Array.isArray(req.files));
  // console.log(!Array.isArray(req.files.videoFile));
  // console.log(!Array.isArray(req.files.thumbnail));

  if (
    !Array.isArray(req.files.videoFile) ||
    !Array.isArray(req.files.thumbnail)
  ) {
    throw new ApiError(400, "video and thumbnail is required");
  }
  const videoLocalPath = req.files?.videoFile[0]?.path;
  const thumbnailLocalPath = req.files?.thumbnail[0]?.path;

  if (!videoLocalPath && !thumbnailLocalPath) {
    throw new ApiError(400, "video and thumbnail is required");
  }

  const video = await uploadOnClouldinary(videoLocalPath);

  const thumbnail = await uploadOnClouldinary(thumbnailLocalPath);

  // console.log("avatar", video);
  // console.log("thumbnail", thumbnail);

  const uploadVideo = await Video.create({
    videoFile: { public_id: video.public_id, url: video.url },
    thumbnail: { public_id: thumbnail.public_id, url: thumbnail.url },
    title,
    description,
    duration: video.duration,
    owner: req.user._id,
  });
  // console.log(updateVideo);
  return res
    .status(201)
    .json(new ApiResponse(201, uploadVideo, "video upload Successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: get video by id ✅

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "video not fount");
  }
  // console.log(video);
  return res
    .status(200)
    .json(new ApiResponse(200, video, "video fetch  Successfully"));
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { title, description } = req.body;
  //TODO: update video details like title, description, thumbnail ✅
  const thumbnailLocalPath = req.file?.path;
  // console.log(thumbnail);

  const thumbnail = await uploadOnClouldinary(thumbnailLocalPath);
  if (!title && !description && !thumbnail) {
    throw new ApiError(400, "no detils to update please enter detils");
  }

  const oldVideoDetail = await Video.findById(videoId);
  console.log(oldVideoDetail);

  await deleteImageOnClouldinary(oldVideoDetail.thumbnail.public_id);

  const video = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: {
        title,
        description,
        thumbnail: { public_id: thumbnail.public_id, url: thumbnail.url },
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, video, "video details  update Successfully"));
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: delete video ✅
  const oldVideoDetail = await Video.findById(videoId);
  if (!oldVideoDetail) {
    throw new ApiError(404, "video not found");
  }

  await deleteVideoOnClouldinary(oldVideoDetail.videoFile.public_id);

  await deleteImageOnClouldinary(oldVideoDetail.thumbnail.public_id);
  const video = await Video.findByIdAndDelete(videoId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "video delete Successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //   TODO:Publush status toggle     ✅

  const oldVideoDetail = await Video.findById(videoId);
  const newStatus = !oldVideoDetail.isPulistshed;
  const video = await Video.findByIdAndUpdate(
    videoId,
    { $set: { isPulistshed: newStatus } },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, video, "video status change successfully"));
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
