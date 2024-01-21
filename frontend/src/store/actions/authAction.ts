import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// const api_url=process.env.SAMPLE
export const userLogin = createAsyncThunk("userLogin", async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/v1/login`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
});

export const userRegister = createAsyncThunk(
  "userRegister",
  async (data:FormData) => {
    try {
        console.log(data)
        
      const response = await axios.post(
        `http://localhost:8000/api/v1/users/register`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        //   withCredentials: true,
        }
      );

      return response;
    } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(`Request failed with status code ${axiosError.response.status}`);

        const { status, data } = axiosError.response;
        // Access the status code and error message
        console.log("Status Code:", status);
        console.log("Error Message:", data);

        // Handle the error or return the response if needed
        return axiosError.response;
      } else if (axiosError.request) {
        // The request was made but no response was received
        console.error('No response received from the server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', axiosError.message);
      }
    } else {
      // Handle non-Axios errors if needed
      console.error('Non-Axios error:', error);
    }
  }

  
  }
);
