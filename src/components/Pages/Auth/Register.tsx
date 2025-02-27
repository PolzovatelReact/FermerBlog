import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { registerUser } from "../../../store/auth-slice/registerSlice"; // ✅ Импорт правильного слайса
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [name, setName] = useState<string>(""); // ✅ Добавляем поле name
  const [login, setLogin] = useState<string>(""); // ✅ Добавляем поле login
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(registerUser({ name, login, email, password })) // ✅ Теперь работает
      .unwrap()
      .then(() => {
        navigate("/profile"); // ✅ Переход на профиль после успешной регистрации
      })
      .catch((err) => {
        console.error("Ошибка регистрации:", err);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Создание аккаунта 2
        </h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Поле для ввода имени */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Имя
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Поле для логина */}
        <div className="mb-4">
          <label htmlFor="login" className="block text-sm font-medium">
            Логин
          </label>
          <input
            type="text"
            id="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Поле для email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Поле для пароля */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            Пароль
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Кнопка регистрации */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          {loading ? "Загрузка..." : "Регистрация"}
        </button>
      </form>
    </div>
  );
};

export default Register;
