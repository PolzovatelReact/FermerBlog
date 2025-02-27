import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./../../hooks/hooks";
import { fetchPosts } from "../../store/posts/postsSlice";
import { useParams, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

const TestDetailPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data, isLoading, hasError } = useAppSelector((state) => state.posts);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id && typeof id === "string") {
      dispatch(fetchPosts());
    }
  }, [id, dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (hasError) return <div>Error loading the post.</div>;
  if (!data.length && !isLoading) return <div>No posts available.</div>;

  const post = data.find((post) => post.id === Number(id));

  if (!post) return <div>Post not found.</div>;

  return (
    <div>
      <h1>{post.textTitle}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.textPage) }}
      />
      <small>
        Created at:{" "}
        {/* {new Date(post.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })} */}
      </small>
      <button onClick={() => navigate(-1)}>Вернуться назад</button>
    </div>
  );
};

export default TestDetailPage;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { TypesPosts } from "../../types/typesPosts";

// const TestDetailPage: React.FC = () => {
//   const { Id } = useParams<{ Id: string }>();
//   const [post, setPost] = useState<TypesPosts | null>(null);

//   useEffect(() => {
//     fetch(`http://localhost:5050/api/posts/${Id}`)
//       .then((response) => response.json())
//       .then((data) => setPost(data))
//       .catch((error) => console.error("Error fetching post:", error));
//   }, [Id]);

//   return (
//     <div>
//       {post ? (
//         <>
//           <h1>{post.title}</h1>
//           <p>{post.text}</p>
//           <p>Category: {post.category}</p>
//           <p>Type: {post.type}</p>
//           <p>Created At: {new Date(post.createdAt).toLocaleString()}</p>
//         </>
//       ) : (
//         <p>Loading post details...</p>
//       )}
//     </div>
//   );
// };

// export default TestDetailPage;
