import React, { useState } from "react";

interface CreatePostsProps {
  farmer_id: string | undefined; // ✅ Теперь `farmer_id` передаётся как пропс
}

const CreatePosts: React.FC<CreatePostsProps> = ({ farmer_id }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null as File | null,
  });

  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!farmer_id) {
      setMessage("❌ Ошибка: ID фермера отсутствует.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("farmer_id", farmer_id); // ✅ Передаём `farmer_id`
    formDataToSend.append("title", formData.title);
    formDataToSend.append("content", formData.content);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await fetch("http://localhost:5013/create-fermer-post", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Пост успешно создан!");
        setFormData({ title: "", content: "", image: null });
      } else {
        setMessage(`❌ Ошибка: ${data.error || "Не удалось создать пост"}`);
      }
    } catch (error) {
      setMessage("❌ Ошибка сервера");
    }
  };

  return (
    <div>
      <h2>Создать пост для фермера #{farmer_id}</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Заголовок:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Содержание:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Изображение:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit">Опубликовать</button>
      </form>
    </div>
  );
};

export default CreatePosts;
