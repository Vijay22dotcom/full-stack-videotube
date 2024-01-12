import mongoose, { isValidObjectId, ObjectId } from "mongoose";
import { Playlist } from "../models/playlist.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  //TODO: create playlist ✅

  if (!name || !description) {
    throw new ApiError(400, "name and description are requeired");
  }
  const playList = await Playlist.create({
    name,
    description,
    owner: req.user._id,
  });

  const createdPlaylist = await Playlist.findById(playList._id);

  if (!createdPlaylist) {
    throw new ApiError(500, `something went wrong while creating playlist`);
  }

  return res
    .status(201)
    .json(new ApiResponse(201, playList, "playList create successfully"));
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  //TODO: get user playlists ✅
  if (!userId) {
    throw new ApiError(400, "userId is required");
  }
  const playlists = await Playlist.find({
    owner: new mongoose.Types.ObjectId(userId),
  });

  if (!playlists) {
    throw new ApiError(404, "no playLists found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playlists, "playLists fetch successfully"));
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  //TODO: get playlist by id ✅
  if (!playlistId) {
    throw new ApiError(400, "PlaylistId is required");
  }

  const playlist = await Playlist.findById(playlistId);

  if (!playlist) {
    throw new ApiError(404, `Playlist with the id ${playlistId} is not exist`);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "playlist fetch successfully"));
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;

  if (!playlistId || !videoId) {
    throw new ApiError(400, "playlistId and videoId both are required");
  }

  const addVideo = await Playlist.findByIdAndUpdate(
    playlistId,
    {
      $push: { videos: videoId },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, addVideo, "add video to playlist successfully"));
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  // TODO: remove video from playlist ✅

  if (!playlistId || !videoId) {
    throw new ApiError(400, "playlistId and videoId both are required");
  }
  const playlist = await Playlist.findByIdAndUpdate(
    playlistId,
    { $pull: { videos: new mongoose.Types.ObjectId(videoId) } },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "playlist updated successfully"));
});

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  // TODO: delete playlist ✅
  if (!playlistId) {
    throw new ApiError(400, "PlaylistId required");
  }

  const deletedPlaylist = await Playlist.findByIdAndDelete(playlistId);

  if (!deletedPlaylist) {
    throw new ApiError(500, `something went wrong while deleting the playlist`);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "playlist deleted successfully"));
});

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;
  //TODO: update playlist ✅
  if (!name || !description) {
    throw new ApiError(400, "Playlist name and description are required");
  }

  if (!playlistId) {
    throw new ApiError(400, "PlaylistId is required");
  }

  const playList = await Playlist.findByIdAndUpdate(
    playlistId,
    {
      $set: {
        name,
        description,
      },
    },
    { new: true }
  );
  if (!playList) {
    throw new ApiError(400, "playlist not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playList, "playlist updated successfully"));
});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
