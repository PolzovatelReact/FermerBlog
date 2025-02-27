import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TypesPosts } from "../../types/typesPosts";

const TestCategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [posts, setPosts] = useState<TypesPosts[]>([]);

  useEffect(() => {
    fetch(`http://localhost:5050/api/posts`)
      .then((response) => response.json())
      .then((data) =>
        setPosts(
          data.filter(
            (post: { category: string | undefined }) =>
              post.category === category
          )
        )
      )
      .catch((error) => console.error("Error fetching posts:", error));
  }, [category]);

  return (
    <div>
      <h1>Posts in Category: {category}</h1>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <a href={`/list/${post.category}/${post._id}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestCategoryPage;
