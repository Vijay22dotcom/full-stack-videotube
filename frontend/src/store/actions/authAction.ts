import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// const api_url=process.env.SAMPLE
export const userLogin = createAsyncThunk("userLogin", async (data:object) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/v1/users/login`,
      data,
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
      console.log(error.response)
      if (axiosError.response) {
        // console.error(`Request failed with status code ${axiosError.response.status}`);

        return axiosError.response;
      } else {
        // Handle non-Axios errors if needed
        console.error("Non-Axios error:", error);
      }
    }
  }
});

export const userRegister = createAsyncThunk(
  "userRegister",
  async (data: FormData) => {
    try {
      console.log(data);

      const response = await axios.post(
        `http://localhost:8000/api/v1/users/register`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
        }
      );

      return response;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // console.log(error)
        const axiosError = error as AxiosError;
        // console.log(error.response)
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
