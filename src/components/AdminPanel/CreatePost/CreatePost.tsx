// components/CreatePost.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  createPost,
  resetState,
  selectCreatePost,
} from "../../../store/create-post/createPostSlice";
import DeletePost from "./DeletePost";

const CreatePost: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, hasError, success } = useAppSelector(selectCreatePost);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [type, setCategoryType] = useState("ferm");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createPost({ title, text, type }));
  };

  const handleReset = () => {
    dispatch(resetState());
    setTitle("");
    setText("");
    setCategoryType("ferm"); // Вернуть к значению по умолчанию
  };
  // Очистка формы после успешного создания поста
  useEffect(() => {
    if (success) {
      setTitle("");
      setText("");
      setCategoryType("ferm");
    }
  }, [success]);
  return (
    <div>
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        {/* <div>
          <select
            value={type}
            onChange={(e) => setCategoryType(e.target.value)}
          >
            <option value="ferm">Ферма</option>
            <option value="main">Мясо</option>
            <option value="sauce">Соусы</option>
          </select>
        </div> */}
        <div>
          <label htmlFor="category">Категория</label>
          <select
            id="category"
            value={type}
            onChange={(e) => setCategoryType(e.target.value)}
            required
          >
            <option value="ferm">Ферма</option>
            <option value="main">Мясо</option>
            <option value="sauce">Соусы</option>
          </select>
        </div>
        <div>
          <label htmlFor="text">Text</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {success && (
        <div>
          <p>Post created successfully!</p>
          <button onClick={handleReset}>Create Another</button>
        </div>
      )}
      {hasError && <p>Failed to create post. Please try again.</p>}
      <DeletePost />
    </div>
  );
};

export default CreatePost;
