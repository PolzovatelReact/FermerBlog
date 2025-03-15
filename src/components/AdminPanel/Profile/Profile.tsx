import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { fetchPostsFarmer } from "../../../store/people/farmers-postsSlice";
import { fetchFarmers } from "../../../store/people/farmersSlice";
import { useParams } from "react-router-dom";
import CreatePosts from "./CreatePosts/CreatePosts";
import AllPosts from "./AllPosts";

interface FarmersPostsProps {
  farmer_id: string | undefined;
}

const Profile: React.FC<FarmersPostsProps> = ({ farmer_id }) => {
  const user = useSelector((state: any) => state.auth.user);
  ////

  const dispatch = useAppDispatch();
  const { datas, isLoading, hasError } = useAppSelector(
    (state) => state.postsfarmer
  );

  useEffect(() => {
    if (user?.id) {
      console.log(`🔍 Запрос постов для фермера ID: ${user.id}`);
      dispatch(fetchPostsFarmer(user.id.toString())); // ✅ Загружаем посты пользователя
    }
  }, [dispatch, user?.id]);

  if (isLoading) return <p>Загрузка постов...</p>;
  if (hasError) return <p>Ошибка при загрузке постов</p>;
  return (
    <div>
      <h1>Привет, {user?.name || "Гость"}!</h1>
      <div>
        <h2>Общие данные</h2>
      </div>
      <div>
        <h2>Данные аккаунта</h2>
        <p>Email: {user?.email}</p>
        <p>Логин: {user?.login}</p>
        <p> {user?.name}</p>
      </div>
      <div>
        <CreatePosts farmer_id={user?.id?.toString()} />

        <div>
          {datas.length === 0 ? (
            <p>У вас пока нет постов.</p>
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
                    src={`http://localhost:5013/uploads/${post.image_url}`}
                    alt={post.title}
                    style={{ maxWidth: "300px" }}
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
