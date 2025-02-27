import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchPeople } from "../../store/people/peopleSlice";
import { useParams, useNavigate } from "react-router-dom";

const PeoplePages: React.FC = () => {
  const dispatch = useAppDispatch();
  const { datas, isLoading, hasError } = useAppSelector(
    (state) => state.people
  );
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id && typeof id === "string") {
      dispatch(fetchPeople());
    }
  }, [id, dispatch]);
  if (isLoading) return <div>Загрузка...</div>;
  if (hasError) return <div>Ошибка...</div>;
  if (!datas.length && !isLoading)
    return <div>Нет доступных пользователей</div>;

  const posts = datas.find((user) => user._id === id);
  if (!posts) return <p>Пользователь не найден </p>;
  return (
    <div>
      <p>Имя: {posts.name}</p>
      <p>Логин: {posts.login}</p>
      <p> Email: {posts.email}</p>
    </div>
  );
};
export default PeoplePages;
