import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const fetchUserDetailById = createAsyncThunk(
  "fetchUserDetailById",
  async (id: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/users/${id}`,
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

export const fetchCurrentUser = createAsyncThunk(
    "fetchCurrentUser",
    async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/users/current-user`,
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
  
