import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    videoFile: {
      public_id: {
        type: String, // couldnary public_id
        required: true,
      },
      url: {
        type: String, // couldnary url
        required: true,
      },
    },

    thumbnail: {
      public_id: {
        type: String, // couldnary public_id
        required: true,
      },
      url: {
        type: String, // couldnary url
        required: true,
      },
    },

    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPulistshed: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "USer",
    },
  },
  {
    timestamps: true,
  }
);

videoSchema.plugin(mongooseAggregatePaginate);
export const Video = mongoose.model("Video", videoSchema);
