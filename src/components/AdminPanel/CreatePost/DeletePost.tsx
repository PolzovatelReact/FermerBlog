import React, { useState, useEffect } from "react";
import axios from "axios";

interface Post {
  _id: string;
  title: string;
  text: string;
  createdAt: string;
}

const DeletePost: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>(
          "http://localhost:5050/api/posts"
        );
        setPosts(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5050/api/posts/${id}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id)); // Обновляем локальный список
    } catch (err) {
      console.error("Failed to delete post", err);
      setError("Failed to delete post");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <button onClick={() => handleDelete(post._id)}> Delete</button>
        </div>
      ))}
    </div>
  );
};

export default DeletePost;
