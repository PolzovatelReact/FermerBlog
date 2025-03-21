import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchBlog } from "../../store/posts/blogReducer";
import { RootState } from "../../store";

interface BlogPost {
  id: number;
  metatitle: string;
  metadescription: string;
  textTitle: string;
  textPage: string;
}

const BlogList: React.FC = () => {
  const dispatch = useDispatch();
  const [images, setImages] = useState<{ filename: string; url: string }[]>([]);
  // Достаем данные из Redux-хранилища
  const { postsblog, loading, error } = useSelector(
    (state: RootState) => state.blog
  );

  useEffect(() => {
    fetch("http://localhost:5013/images")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((error) => console.error("Ошибка загрузки изображений:", error));
  }, []);
  // Запускаем запрос при монтировании компонента
  useEffect(() => {
    dispatch(fetchBlog() as any); // Приводим к `any`, чтобы избежать ошибки TS
  }, [dispatch]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>📜 Список блогов</h2>

      {images.map((img) => (
        <img
          key={img.filename}
          src={img.url}
          alt="Изображение"
          style={{ width: "150px", height: "auto", borderRadius: "8px" }}
        />
      ))}
      {postsblog.map((blog) => (
        <div
          key={blog.id}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            margin: "10px 0",
          }}
        >
          <h3>{blog.textTitle}</h3>
          <p>
            <strong>{blog.metatitle}</strong>
          </p>
          <p>{blog.metadescription}</p>
          <p>{blog.textPage}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
