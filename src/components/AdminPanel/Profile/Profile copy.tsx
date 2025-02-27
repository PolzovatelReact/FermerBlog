import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Profile: React.FC = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );

  // Получаем токен из Redux Store
  const token = useSelector((state: any) => state.auth.token);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) return;

      try {
        const response = await fetch("http://localhost:5050/api/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data); // Устанавливаем данные пользователя
        } else {
          console.error("Ошибка при получении профиля:", data.message);
        }
      } catch (error) {
        console.error("Ошибка сервера:", error);
      }
    };

    fetchUserProfile();
  }, [token]);

  return (
    <div>
      <h2>Профиль пользователя</h2>
      {user ? (
        <div>
          <p>
            Имя: <strong>{user.name}</strong>
          </p>
          <p>
            Email: <strong>{user.email}</strong>
          </p>
        </div>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
};

export default Profile;
