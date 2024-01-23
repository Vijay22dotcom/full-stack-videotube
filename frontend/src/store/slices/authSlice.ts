import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userRegister } from "../actions/authAction";

import { RootState } from "../store";

interface AuthState {
  isLoading: boolean;
  isError: boolean;
  user: any;
}

const initialState: AuthState = {
  isLoading: false,
  isError: false,
  user: [],
};

export const authSlice = createSlice({
  name: "videoSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state, action) => {
      (state.isLoading = true), (state.user = []);
    });

    builder.addCase(userLogin.fulfilled, (state, action) => {
      (state.isLoading = false), (state.user = action.payload);
    });

    builder.addCase(userLogin.rejected, (state, action) => {
      console.log(action.payload);
      (state.isLoading = false), (state.isError = true);
    });

    builder.addCase(userRegister.pending, (state, action) => {
      (state.isLoading = true), (state.user = []);
    });

    builder.addCase(userRegister.fulfilled, (state, action) => {
      (state.isLoading = false), (state.user = action.payload);
    });

    builder.addCase(userRegister.rejected, (state, action) => {
      console.log(action.payload);
      (state.isLoading = false), (state.isError = true);
    });
  },

  reducers: {},
});

  export const isLoading=(state:RootState)=>state.auth.isLoading

export default authSlice.reducer;
