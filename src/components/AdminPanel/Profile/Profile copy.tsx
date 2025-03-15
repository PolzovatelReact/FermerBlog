import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { fetchPostsFarmer } from "../../../store/people/farmers-postsSlice";
import CreatePosts from "./CreatePosts/CreatePosts";
import AllPosts from "./AllPosts";

interface FarmersPostsProps {
  farmer_id: string | undefined;
}

const Profile: React.FC<FarmersPostsProps> = () => {
  const user = useSelector((state: any) => state.auth.user);

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
        <CreatePosts farmer_id={undefined} />
        <AllPosts farmer_id={undefined} />
      </div>
    </div>
  );
};

export default Profile;
