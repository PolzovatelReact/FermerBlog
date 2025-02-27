import React, { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
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
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.textPage),
          }}
        />
        <button onClick={() => navigate(-1)} style={{ marginBottom: "10px" }}>
          Вернуться назад
        </button>
      </div>
    </div>
  );
};

export default PostDetails;
