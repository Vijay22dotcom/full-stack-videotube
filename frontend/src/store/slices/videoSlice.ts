import { createSlice } from "@reduxjs/toolkit";
import { fetchAllVideo, fetchUserAllVideos } from "../actions/videoAction";
import { RootState } from "../store";

interface VideoState {
  isLoading: boolean;
  isError: boolean;
  videos: any;
  channelVideo:any
}

const initialState: VideoState = {
  isLoading: false,
  isError: false,
  videos: [],
  channelVideo:[]
};


export const videoSlice = createSlice({
  name: "videoSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAllVideo.pending, (state, action) => {
      (state.isLoading = true), (state.videos = []);
    });

    builder.addCase(fetchAllVideo.fulfilled, (state, action) => {
      (state.isLoading = false), (state.videos = action.payload);
    });

    builder.addCase(fetchAllVideo.rejected, (state, action) => {
      console.log(action.payload);
      (state.isLoading = false), (state.isError = true);
    });

    builder.addCase(fetchUserAllVideos.pending, (state, action) => {
      (state.isLoading = true), (state.channelVideo = []);
    });

    builder.addCase(fetchUserAllVideos.fulfilled, (state, action) => {
      (state.isLoading = false), (state.channelVideo = action.payload);
    });

    builder.addCase(fetchUserAllVideos.rejected, (state, action) => {
      console.log(action.payload);
      (state.isLoading = false), (state.isError = true);
    });
  },

  reducers: {},
});


export const getAllVideo=(state:RootState)=>state.video.videos
export const getChannelAllVideo=(state:RootState)=>state.video.channelVideo
export const isLoading=(state:RootState)=>state.video.isLoading

export default videoSlice.reducer;
