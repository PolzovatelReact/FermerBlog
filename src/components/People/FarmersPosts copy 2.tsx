import React, { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useParams,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchPostsFarmer } from "../../store/people/farmers-postsSlice";

const FarmersPosts: React.FC = () => {
  const params = useParams();
  console.log("📌 useParams():", params); // ✅ Посмотрим, что в `params`

  const farmer_id = params.farmer_id;
  console.log("📌 farmer_id из URL:", farmer_id); // ✅ Проверяем `farmer_id`

  const dispatch = useAppDispatch();
  const { datas, isLoading, hasError } = useAppSelector(
    (state) => state.postsfarmer
  );

  useEffect(() => {
    if (farmer_id) {
      dispatch(fetchPostsFarmer(farmer_id));
    }
  }, [dispatch, farmer_id]);

  if (isLoading) return <p>Загрузка постов...</p>;
  if (hasError) return <p>Ошибка при загрузке постов</p>;

  return (
    <div>
      <h2>Посты фермера #{farmer_id}</h2>

      {datas.length === 0 ? (
        <p>У этого фермера пока нет постов.</p>
      ) : (
        datas.map((post) => (
          <div
            key={post.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))
      )}

      {datas.length === 0 ? (
        <p>У этого фермера пока нет постов.</p>
      ) : (
        datas.map((post) => (
          <div
            key={post.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            {post.image_url && (
              <img
                src={post.image_url}
                alt={post.title}
                style={{ maxWidth: "100%" }}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default FarmersPosts;
