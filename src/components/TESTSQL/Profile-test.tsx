//ProfileTest
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5013"; // Заменить на реальный сервер

const ProfileTest: React.FC = () => {
  const [profile, setProfile] = useState<{
    userId: number;
    email: string;
  } | null>(null);
  const navigate = useNavigate();

  // 📌 Проверяем токен
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // 📌 Если нет токена, редирект на главную
      return;
    }

    axios
      .get(`${API_URL}/profile-test`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProfile(res.data.user))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/"); // 📌 Если токен недействителен, выходим
      });
  }, [navigate]);

  return (
    <div className="profile-container">
      <h2>Профиль</h2>
      {profile ? (
        <>
          <p>ID: {profile.userId}</p>
          <p>Email: {profile.email}</p>
        </>
      ) : (
        <p>Загрузка...</p>
      )}
      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/"); // 📌 Выход и редирект
        }}
      >
        Выйти
      </button>
    </div>
  );
};

export default ProfileTest;
