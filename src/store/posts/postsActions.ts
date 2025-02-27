import { createAsyncThunk } from "@reduxjs/toolkit";
import checkResponse from "../../utils/checkResponse";
// import { BASE_URL } from "../../utils/constants";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5050/api/posts`);
      const data = await response.json();
      console.log("Fetched posts:", data); // Логируем данные
      return data;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue("Произошла неизвестная ошибка");
      }
    }
  }
);
// export const fetchPosts = createAsyncThunk(
//   "posts/fetchPosts",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetch(`http://localhost:5050/api/posts`);

//       // Используйте checkResponse для проверки ответа
//       const data = await checkResponse(response);

//       return data.data;
//     } catch (err) {
//       // Проверяем, является ли ошибка экземпляром Error
//       if (err instanceof Error) {
//         return rejectWithValue(err.message); // Безопасный доступ к сообщению об ошибке
//       } else {
//         return rejectWithValue("Произошла неизвестная ошибка");
//       }
//     }
//   }
// );
