import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { fetchPostsFarmer } from "../../../../store/people/farmers-postsSlice";

interface FarmersPostsProps {
  farmer_id: string | undefined; // ✅ Теперь `farmer_id` передаётся как пропс
}

const AllPosts: React.FC<FarmersPostsProps> = ({ farmer_id }) => {
  const dispatch = useAppDispatch();
  const { datas, isLoading, hasError } = useAppSelector(
    (state) => state.postsfarmer
  );

  useEffect(() => {
    if (farmer_id) {
      dispatch(fetchPostsFarmer(farmer_id)); // ✅ Загружаем посты этого фермера
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
  );
};

export default AllPosts;
