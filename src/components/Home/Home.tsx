import React from "react";
import PostList from "../Post/PostList";
import Register from "../Register";

const Home: React.FC = () => {
  return (
    <>
      <Register />
      <PostList />
    </>
  );
};
export default Home;
