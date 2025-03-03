import { configureStore } from "@reduxjs/toolkit";

//import { postsReducer } from "./posts/postsReducer";
import postsReducer from "./posts/postsSlice";
import createPostSlice from "./create-post/createPostSlice";
import deletePostReducere from "./delete-post/deletePostSlice";
import fetchPeople from "./people/peopleSlice";
import authReducer from "./auth-slice/authSlice";
import registerReducer from "./auth-slice/registerSlice";
import themeReducer from "./themeSlice/themeSlice";
import eventsReducer from "./events/eventsSlice";
import { postsBlog } from "./posts/blogReducer";
import farmersReducer from "./people/farmersSlice";
export const store = configureStore({
  reducer: {
    blog: postsBlog,
    posts: postsReducer,
    createPost: createPostSlice,
    deletePost: deletePostReducere,
    people: fetchPeople,
    auth: authReducer,
    reg: registerReducer,
    theme: themeReducer, // Смена режима: Переход на светлую сторону / Переход на темную сторону =)
    event: eventsReducer,
    farmers: farmersReducer, // из sqlight данные фермера которые будут выводится на страницу фермеры
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
