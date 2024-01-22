import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./slices/videoSlice";
import authReducer from "./slices/authSlice";

 const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    video: videoReducer,
    auth:authReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

export  default store
