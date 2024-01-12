import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  // TODO: toggle subscription ✅

  const isSubscription = await Subscription.findOne({
    $and: [
      { subscriber: new mongoose.Types.ObjectId(req.user._id) },
      { channel: new mongoose.Types.ObjectId(channelId) },
    ],
  });

  if (!isSubscription) {
    const subscription = await Subscription.create({
      subscriber: req.user._id,
      channel: channelId,
    });

    if (!subscription) {
      throw new ApiError(
        500,
        "something went wrong while toggle subscription on video"
      );
    }
  } else {
    await Subscription.findByIdAndDelete(isSubscription._id);
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, isSubscription, "subscription toggle successfully")
    );
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  // console.log(channelId); ✅
  const subscriberList = await Subscription.find({
    channel: new mongoose.Types.ObjectId(channelId),
  });
  // console.log(subscriberList);
  return res
    .status(200)
    .json(
      new ApiResponse(200, subscriberList, "subscriberList fetch successfully")
    );
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params; // subscriberId id is user id ✅

  const subscriptionsList = await Subscription.find({
    subscriber: new mongoose.Types.ObjectId(subscriberId),
  });

  if (!subscriptionsList) {
    throw new ApiError(404, "no subscription found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        subscriptionsList,
        "subscriberList fetch successfully"
      )
    );
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
