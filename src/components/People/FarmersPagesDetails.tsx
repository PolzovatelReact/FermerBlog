import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchFarmers } from "../../store/people/farmersSlice";
import { useParams } from "react-router-dom";

interface User {
  id: number;
  username: string;
  last_name: string;
  email: string;
}
const FarmersPagesDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const { datas, isLoading, hasError } = useAppSelector(
    (state) => state.farmers
  );
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      dispatch(fetchFarmers());
    }
  }, [id, dispatch]);

  if (isLoading) return <div>Загрузка...</div>;
  if (hasError) return <div>Ошибка...</div>;
  if (!datas?.length) return <div>Нет доступных пользователей</div>;

  // Приведение id к числу перед сравнением
  const user = datas.find((user: User) => user.id === Number(id));

  if (!user) return <p>Пользователь не найден</p>;

  return (
    <div>
      <p>Имя: {user.username}</p>
      <p>Логин: {user.last_name}</p>
      <p> Email: {user.email}</p>
    </div>
  );
};
export default FarmersPagesDetails;
