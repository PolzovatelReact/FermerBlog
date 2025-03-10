/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchPosts } from "../../../store/posts/postsSlice";
import { useParams, useNavigate } from "react-router-dom";
import { RootState } from "../../../store";
import "./../../../index.css"; // Подключение темы
import DOMPurify from "dompurify";
import styles from "./style.module.css";
import LeftMenu from "./LeftMenu";

interface Post {
  id: number | string;
  metatitle: string;
  metadescription: string;
  textTitle: string;
  textPage: string;
  type: string;
  category: string;
  url: string;
  image_path: string;
}

const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data, isLoading, hasError } = useAppSelector((state) => state.posts);
  const { postId } = useParams<{ postId: string }>(); // Получаем postId из параметров URL
  const theme = useSelector((state: RootState) => state.theme.theme); // Переключение темы

  useEffect(() => {
    if (postId && data.length === 0) {
      dispatch(fetchPosts());
    }
  }, [postId, dispatch, data.length]);

  // Оптимизация списка уникальных категорий
  const uniqueCategories = useMemo(
    () => Array.from(new Set(data.map((post) => post.type))),
    [data]
  );

  const categoryNames: { [key: string]: string } = {
    sauce: "Соусы",
    main: "Мясо",
    dessert: "Десерты",
    article: "Обучение",
    paython: "Питон",
  };

  if (isLoading || data.length === 0) return <div>Загрузка...</div>;
  if (hasError) return <div>Ошибка загрузки записи.</div>;

  // Приводим postId к числу, если id в базе числовой
  const post = data.find((post: Post) => post.id === Number(postId));
  if (!post) return <div>Запись не найдена.</div>;

  return (
    <div className={styles.content_main}>
      <LeftMenu
        uniqueCategories={uniqueCategories}
        categoryNames={categoryNames}
      />

      <div className={`${styles.blog_right} navTest ${theme}`}>
        <h1>{post.textTitle}</h1>
        {post.image_path && (
          <img
            src={`http://localhost:5013/uploads/${post.image_path}`} // 👈 Выводим картинку
            alt={post.textTitle}
            style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
          />
        )}
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.textPage),
          }}
        />
        <a
          className={styles.blog_right_link_back_text}
          onClick={() => navigate(-1)}
          style={{ marginBottom: "10px", marginTop: "10px" }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.33333 15.8337L2.5 10.0003M2.5 10.0003L8.33333 4.16699M2.5 10.0003L17.5 10.0003"
              stroke="#999999"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
          Вернуться назад
        </a>
        {/* <button
          className={styles.blog_right_link_back_text}
          onClick={() => navigate(-1)}
          style={{ marginBottom: "10px" }}
        >
          Вернуться назад
        </button> */}
      </div>
    </div>
  );
};
export default PostDetails;
