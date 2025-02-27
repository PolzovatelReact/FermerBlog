import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchPosts } from "../../store/posts/postsSlice";
import DOMPurify from "dompurify";

const PostList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, hasError } = useAppSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (isLoading) return <div> Loading...</div>;
  if (hasError) return <div> Error loading posts.</div>;

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {data.map((post) => (
          <li key={post.id}>
            <h2>{post.textTitle}</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.metadescription),
              }}
            />
            {/* <small>{new Date(post.createdAt).toLocaleString()}</small> */}
            <Link to={`/postlist/${post.id}`}>Подробнее</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
