import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
  //TODO: get all comments for a video✅
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  if (!videoId) {
    throw new ApiError(400, "videoId is requeired");
  }

  const comments = await Comment.find({
    video: new mongoose.Types.ObjectId(videoId),
  });

  if (!comments) {
    throw new ApiError(404, "comments not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, comments, "video comments fetch successfully"));
});

const addComment = asyncHandler(async (req, res) => {
  // TODO: add a comment to a video ✅
  const { content } = req.body;
  const { videoId } = req.params;

  if (!content) {
    throw new ApiError(400, "comment is required");
  }

  const comment = await Comment.create({
    content,
    video: videoId,
    owner: req.user._id,
  });

  if (!comment) {
    throw new ApiError(500, "something went wrong while add comment on video");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, comment, "comment add successfully"));
});

const updateComment = asyncHandler(async (req, res) => {
  // TODO: update a comment ✅
  const { content } = req.body;
  const { commentId } = req.params;
  if (!content) {
    throw new ApiError(400, "comment is required");
  }
  const comment = await Comment.findByIdAndUpdate(
    commentId,
    {
      $set: { content },
    },
    {
      new: true,
    }
  );

  if (!comment) {
    throw new ApiError(
      500,
      "something went wrong while updating comment on video"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, comment, "comment updated successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  // TODO: delete a comment✅
  const { commentId } = req.params;

  if (!commentId) {
    throw new ApiError(400, "commentId is requeired");
  }

  const comment = await Comment.findByIdAndDelete(commentId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "comment delete successfully"));
});

export { getVideoComments, addComment, updateComment, deleteComment };
