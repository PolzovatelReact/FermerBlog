import React from "react";
import { useSelector } from "react-redux";

const Profile: React.FC = () => {
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
      </div>
      <div>
        <h2>Пароль</h2>
      </div>
    </div>
  );
};

export default Profile;
