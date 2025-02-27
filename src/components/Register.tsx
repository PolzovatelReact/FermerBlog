import React, { useState } from "react";
import axios from "axios";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    login: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5050/api/users",
        formData
      );
      setMessage(response.data.message);
    } catch (err) {
      setMessage(
        "Ошибка при регистрации. Проверьте данные и попробуйте снова."
      );
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Регистрация</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Имя:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Логин:</label>
          <input
            type="text"
            name="login"
            value={formData.login}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
