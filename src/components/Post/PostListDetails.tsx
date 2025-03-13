import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchPosts } from "../../store/posts/postsSlice";
import { useParams, useNavigate } from "react-router-dom"; // Assuming you're using React Router
import DOMPurify from "dompurify";

const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data, isLoading, hasError } = useAppSelector((state) => state.posts);
  const { id } = useParams<{ id: string }>(); // Get the post ID from the URL

  useEffect(() => {
    if (id) {
      dispatch(fetchPosts());
    }
  }, [id, dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (hasError) return <div>Error loading the post.</div>;
  const post = data.find((post) => post.id === Number(id));

  if (!post) return <div>Post not found.</div>;

  return (
    <div>
      <h1>{post.textTitle}</h1>

      {post.image_path && (
        <img
          src={`http://localhost:5013${post.image_path}`} // 👈 Вывод изображения
          alt={post.textTitle}
          style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
        />
      )}
      {/* <p>{post.text}</p> */}
      <div
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.textPage) }}
      />
      {/* <small>Created at: {new Date(post.createdAt).toLocaleString()}</small> */}
      <button onClick={() => navigate(-1)}> Вернутся назад</button>
    </div>
  );
};

export default PostDetails;
