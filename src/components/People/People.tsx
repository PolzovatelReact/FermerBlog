import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchPeople } from "../../store/people/peopleSlice";
import { Link } from "react-router-dom";

const People: React.FC = () => {
  const dispatch = useAppDispatch();
  const { datas, isLoading, hasError } = useAppSelector(
    (state) => state.people
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDirection, setSelectedDirection] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    dispatch(fetchPeople());
  }, [dispatch]);

  // Получить список уникальных направлений
  const uniqueDirections = Array.from(
    new Set(datas.map((user) => user.directions))
  );
  // Получить уникальные города из данных
  const uniqueCities = Array.from(new Set(datas.map((user) => user.city)));

  const filteredUsers = datas.filter((user) => {
    const matchesName = user.name
      ?.toLowerCase()
      .includes(searchQuery?.toLowerCase() || "");
    const matchesDirection =
      !selectedDirection || user.directions === selectedDirection;
    const matchesCity = !selectedCity || user.city === selectedCity;

    return matchesName && matchesDirection && matchesCity;
  });

  if (isLoading) return <p> Загрузка...</p>;
  if (hasError) return <p> Ошибка</p>;
  return (
    <div>
      <h1>Люди</h1>
      <input
        type="text"
        placeholder="Введите имя для поиска"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value.trim())} // trim удаляем пустой пробел
      />
      <select
        value={selectedDirection}
        onChange={(e) => setSelectedDirection(e.target.value)}
        style={{ marginBottom: "20px", padding: "10px", width: "100%" }}
      >
        <option value="">Все направления</option>
        {uniqueDirections.map((direction) => (
          <option key={direction} value={direction}>
            {direction}
          </option>
        ))}
      </select>

      {/* Выпадающий список для выбора города */}
      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        style={{ marginBottom: "20px", padding: "10px", width: "100%" }}
      >
        <option value="">Все города</option>
        {uniqueCities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      {filteredUsers.length > 0 ? (
        <ul>
          {filteredUsers.map((user) => (
            <li key={user._id}>
              <Link to={`/people/${user._id}`}>{user.name}</Link> -{" "}
              {user.directions} -{user.city}
            </li>
          ))}
        </ul>
      ) : (
        <p>Пользователи не найдены</p>
      )}
    </div>
  );
};
export default People;
