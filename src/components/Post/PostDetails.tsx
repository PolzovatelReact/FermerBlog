import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

interface Post {
  _id: string;
  title: string;
  text: string;
  createdAt: string;
}

const PostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get<Post>(
          `http://localhost:5050/api/posts/${id}`
        );
        setPost(response.data);
      } catch (err) {
        console.error("Failed to fetch post details:", err);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <p>Loading post...</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.text}</p>
      <small>{new Date(post.createdAt).toLocaleString()}</small>
      <br />
      <Link to="/">Back to posts</Link>
    </div>
  );
};

export default PostDetails;
