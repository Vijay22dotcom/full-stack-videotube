import { createAsyncThunk } from "@reduxjs/toolkit";
import axios,{AxiosError} from "axios";

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

export const fetchUserAllVideos = createAsyncThunk(
  "fetchUserAllVideos",
  async (userId:string) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/videos/user?userId=${userId}`,
        {
          
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // console.log(error)
        const axiosError = error as AxiosError;
        console.log(error.response);
        if (axiosError.response) {
          // console.error(`Request failed with status code ${axiosError.response.status}`);

          return axiosError.response;
        } else {
          // Handle non-Axios errors if needed
          console.error("Non-Axios error:", error);
        }
      }
    }
  }
);

