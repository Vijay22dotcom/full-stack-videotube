import { createSlice } from "@reduxjs/toolkit";


import { RootState } from "../store";
import { fetchCurrentUser, fetchUserDetailById } from "../actions/userAction";

interface AuthState {
  isLoading: boolean;
  isError: boolean;
  currentUser: any;
  user:any
}

const initialState: AuthState = {
  isLoading: false,
  isError: false,
  currentUser: {},
  user:[]
};

export const authSlice = createSlice({
  name: "videoSlice",
  initialState,
  extraReducers: (builder) => {

    builder.addCase(fetchUserDetailById.pending, (state, action) => {
      (state.isLoading = true), (state.user = []);
    });

    builder.addCase(fetchUserDetailById.fulfilled, (state, action) => {
      (state.isLoading = false), (state.user = action.payload?.data);
    });

    builder.addCase(fetchUserDetailById.rejected, (state, action) => {
      console.log(action.payload);
      (state.isLoading = false), (state.isError = true);
    });

    builder.addCase(fetchCurrentUser.pending, (state, action) => {
        (state.isLoading = true), (state.currentUser = []);
      });
  
      builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
        (state.isLoading = false), (state.currentUser = action.payload?.data);
      });
  
      builder.addCase(fetchCurrentUser.rejected, (state, action) => {
        console.log(action.payload);
        (state.isLoading = false), (state.isError = true);
      });
   
  },

  reducers: {},
});

  export const isLoading=(state:RootState)=>state.user.isLoading
  export const getCurrentUser=(state:RootState)=>state.user.currentUser

export default authSlice.reducer;
