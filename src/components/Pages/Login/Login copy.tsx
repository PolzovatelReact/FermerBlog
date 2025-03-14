import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { loginSqlUser } from "../../../store/auth-slice/authSqlSlice";
import { useNavigate } from "react-router-dom";

const Auth: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  // 🔹 Редирект если уже авторизован
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginSqlUser({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/profile"); // Редирект после успешной авторизации
      })
      .catch((err) => {
        console.error("Ошибка авторизации", err);
      });
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Авторизация</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? " Загрузка..." : "Войти"}
        </button>
      </form>
    </div>
  );
};
export default Auth;
