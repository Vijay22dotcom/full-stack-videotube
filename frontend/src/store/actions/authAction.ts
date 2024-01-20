import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
