import React, { useState } from "react";

const CreateTestPost: React.FC = () => {
  const [formData, setFormData] = useState({
    metatitle: "",
    metadescription: "",
    textTitle: "",
    textPage: "",
    type: "",
    category: "",
    url: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Выберите изображение!");
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    formDataToSend.append("image", file);

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5013/create-post", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Пост успешно создан!");
      } else {
        alert("Ошибка: " + result.error);
      }
    } catch (error) {
      console.error("Ошибка загрузки:", error);
      alert("Не удалось создать пост");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Создать пост</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          name="metatitle"
          placeholder="Заголовок"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="metadescription"
          placeholder="Описание"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="textTitle"
          placeholder="Название статьи"
          onChange={handleChange}
          required
        />
        <textarea
          name="textPage"
          placeholder="Текст статьи"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="type"
          placeholder="Тип (например, main)"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Категория"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="url"
          placeholder="URL"
          onChange={handleChange}
          required
        />
        <input type="file" onChange={handleFileChange} required />
        <button type="submit" disabled={loading}>
          {loading ? "Загрузка..." : "Создать пост"}
        </button>
      </form>
    </div>
  );
};

export default CreateTestPost;
