import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { fetchSubscribed, fetchSubscribers, toggleSubscription } from "../actions/subscriptionAction";

interface AuthState {
    isLoading: boolean;
    isError: boolean;
    data:any;
    subscribers:any;
    subscribed:any;

  }


  const initialState: AuthState = {
    isLoading: false,
    isError: false,
    data:[],
    subscribers:[],
    subscribed:[]
    

  };

  export const subscriptionSlice = createSlice({
    name: "videoSlice",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(toggleSubscription.pending, (state, action) => {
            (state.isLoading = true), (state.data = []);
          });
      
          builder.addCase(toggleSubscription.fulfilled, (state, action) => {
            (state.isLoading = false), (state.data = action.payload?.data);
          });
      
          builder.addCase(toggleSubscription.rejected, (state, action) => {
            console.log(action.payload);
            (state.isLoading = false), (state.isError = true);
          });
          builder.addCase(fetchSubscribers.pending, (state, action) => {
            (state.isLoading = true), (state.subscribers = []);
          });
      
          builder.addCase(fetchSubscribers.fulfilled, (state, action) => {
            (state.isLoading = false), (state.subscribers = action.payload?.data);
          });
      
          builder.addCase(fetchSubscribers.rejected, (state, action) => {
            console.log(action.payload);
            (state.isLoading = false), (state.isError = true);
          });
          builder.addCase(fetchSubscribed.pending, (state, action) => {
            (state.isLoading = true), (state.subscribed = []);
          });
      
          builder.addCase(fetchSubscribed.fulfilled, (state, action) => {
            (state.isLoading = false), (state.subscribed = action.payload?.data);
          });
      
          builder.addCase(fetchSubscribed.rejected, (state, action) => {
            console.log(action.payload);
            (state.isLoading = false), (state.isError = true);
          });
    },

    reducers: {}

})

export const  getChannelSubscribers=(state:RootState)=>state.subscription.subscribers
export const  getChannelSubscribed=(state:RootState)=>state.subscription.subscribed
export const  isLoading=(state:RootState)=>state.subscription.isLoading

export default subscriptionSlice.reducer