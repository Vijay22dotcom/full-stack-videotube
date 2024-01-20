import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const api_url=process.env.SAMPLE
export const fetchAllVideo = createAsyncThunk("fetchAllVideo", async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/v1/videos`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
});
