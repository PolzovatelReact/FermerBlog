// src/App.tsx
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { setToken, finishLoading } from "./store/auth-slice/authSlice";
import PostList from "./components/Post/PostList";
import Home from "./components/Home/Home";
import PostDetails from "./components/Blog/BlogList/PostDetails";
import PostListDetails from "./components/Post/PostListDetails";
import CreatePost from "./components/AdminPanel/CreatePost/CreatePost";
import Header from "./components/Header/Heder";
import BlogList from "./components/Blog/BlogList/BlogList";
import styles from "./App.module.css";
import TestListPage from "./components/TestList/TestListPage";
import TestCategoryPage from "./components/TestList/TestCategoryPage";
import TestDetailPage from "./components/TestList/TestDetailPage";
import People from "./components/People/People";
import PeoplePages from "./components/People/PeoplePages";
import Profile from "./components/AdminPanel/Profile/Profile";
import Chats from "./components/AdminPanel/Chats/Chats";
import Login from "./components/Pages/Login/Login";
import Auth from "./components/Pages/Auth/Auth";
import "./index.css"; // здесь переключатель темы
import Events from "./components/Pages/Events/Events";
import EventsDetails from "./components/Pages/Events/EventsDetails";
import Register from "./components/Pages/Auth/Register";
import TestSql from "./components/TESTSQL/TestSql";
import UploadFile from "./components/TESTSQL/UploadFile";
import CreateTestPost from "./components/TESTSQL/CreateTestPost";
import PeopleFarmers from "./components/People/PeopleFarmers";
import FarmersPagesDetails from "./components/People/FarmersPagesDetails";

// Защищенные маршруты
const PrivateRoute = ({ element, isAuthenticated }: any) => {
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};
const App: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme.theme); //переключение темы
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector(
    (state: any) => state.auth
  );

  // Проверка токена при загрузке приложения
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("user");

    if (token && user) {
      dispatch(setToken({ token, user: JSON.parse(user) }));
    } else {
      dispatch(finishLoading());
    }
  }, [dispatch]);

  useEffect(() => {
    // Переключение темы
    document.body.className = theme; // Добавляем класс light или dark к body
  }, [theme]);

  // Пока идет загрузка токена, показываем индикатор загрузки
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Header />
      <div className={styles.content_main}>
        <Routes>
          <Route path="sqltest" element={<TestSql />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* SQL авторизация и регистрация */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/registration" element={<Register />} />
          <Route path="/people" element={<People />} />
          <Route path="people/:id" element={<PeoplePages />} />
          {/* <Route path="/chats" element={<Chats />} /> */}
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/postlist" element={<PostList />} />
          <Route path="/postlist/:id" element={<PostListDetails />} />
          <Route path="/create-post" element={<CreatePost />} />{" "}
          {/*Добавить и удалить пост*/}
          <Route path="/bloglist" element={<BlogList />} />
          <Route path="/bloglist/:category" element={<BlogList />} />
          <Route path="/bloglist/:category/:postId" element={<PostDetails />} />
          {/*Добавить и удалить пост*/}
          <Route path="/list" element={<TestListPage />} />
          <Route path="/list/:category" element={<TestCategoryPage />} />
          <Route path="/list/:category/:id" element={<TestDetailPage />} />
          <Route path="/uploadfile" element={<UploadFile />} />
          <Route path="/createtestpost" element={<CreateTestPost />} />
          <Route path="/farmers" element={<PeopleFarmers />} />
          <Route path="/farmers/:id" element={<FarmersPagesDetails />} />
          {/* <Route path="/farmers/:id/:farmer_id" element={<FarmersPosts />} /> */}
          {/* <Route element={<PrivateRoutes isAuthenticated={isAuthenticated} />}>
            <Route
              path="/profile"
              element={
                isAuthenticated ? <Profile /> : <Navigate to="/login" replace />
              }
            />
          </Route> */}
          <Route
            path="/profile"
            element={
              <PrivateRoute
                isAuthenticated={isAuthenticated}
                element={<Profile />}
              />
            }
          />
          <Route
            path="/chats"
            element={
              <PrivateRoute
                isAuthenticated={isAuthenticated}
                element={<Chats />}
              />
            }
          />
          <Route
            path="/events"
            element={
              <PrivateRoute
                isAuthenticated={isAuthenticated}
                element={<Events />}
              />
            }
          />
          <Route
            path="/events/:id"
            element={
              <PrivateRoute
                isAuthenticated={isAuthenticated}
                element={<EventsDetails />}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
