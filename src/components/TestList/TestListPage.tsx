import React, { useEffect, useState } from "react";
import { TypesPosts } from "../../types/typesPosts";

const TestListPage: React.FC = () => {
  const [posts, setPosts] = useState<TypesPosts[]>([]);

  useEffect(() => {
    fetch("http://localhost:5050/api/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <div>
      <h1>All Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <a href={`/list/${post.category}`}>{post.category}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestListPage;
