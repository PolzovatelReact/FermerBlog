import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { loginSqlUser } from "../../../store/auth-slice/authSqlSlice";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth
  );

  // 🔹 Редирект если уже авторизован
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginSqlUser({ email, password }))
      .unwrap()
      .then(() => {
        window.location.href = "/profile";
      })
      .catch((err) => console.error("Ошибка авторизации", err));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Авторизация</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 w-full"
          />

          <label htmlFor="password" className="block">
            Пароль
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 w-full"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            {loading ? "Загрузка..." : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
