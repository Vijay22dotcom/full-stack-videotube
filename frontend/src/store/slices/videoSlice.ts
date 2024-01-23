import { createSlice } from "@reduxjs/toolkit";
import { fetchAllVideo } from "../actions/videoAction";
import { RootState } from "../store";

interface VideoState {
  isLoading: boolean;
  isError: boolean;
  videos: any;
}

const initialState: VideoState = {
  isLoading: false,
  isError: false,
  videos: [],
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
  },

  reducers: {},
});


export const getAllVideo=(state:RootState)=>state.video.videos
export const isLoading=(state:RootState)=>state.video.isLoading

export default videoSlice.reducer;
