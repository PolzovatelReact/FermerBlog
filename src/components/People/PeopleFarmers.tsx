import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useSelector } from "react-redux";
import { fetchFarmers } from "../../store/people/farmersSlice";
import { RootState } from "../../store";
import { Link } from "react-router-dom";
import people from "./people.module.css";
import "../../index.css"; // здесь переключатель темы

//farm_type - напрвления фермы
const PeopleFarmers: React.FC = () => {
  const dispatch = useAppDispatch();
  const { datas, isLoading, hasError } = useAppSelector(
    (state) => state.farmers
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDirection, setSelectedDirection] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const theme = useSelector((state: RootState) => state.theme.theme); // Переключение темы

  useEffect(() => {
    dispatch(fetchFarmers());
  }, [dispatch]);

  // Получить список уникальных направлений
  const uniqueDirections = Array.from(
    new Set(datas.map((user) => user.farm_type))
  );
  // Получить уникальные города из данных
  const uniqueCities = Array.from(new Set(datas.map((user) => user.location)));

  const filteredUsers = datas.filter((user) => {
    const matchesName = user.username
      ?.toLowerCase()
      .includes(searchQuery?.toLowerCase() || "");
    const matchesDirection =
      !selectedDirection || user.farm_type === selectedDirection;
    const matchesCity = !selectedCity || user.location === selectedCity;

    return matchesName && matchesDirection && matchesCity;
  });

  if (isLoading) return <p> Загрузка...</p>;
  if (hasError) return <p> Ошибка</p>;
  return (
    <div>
      <div className={people.content_main}>
        <div className={people.content_main_left}>Left banner</div>
        <div className={`${people.content_main_people} navTest ${theme}`}>
          <h1>Фермеры</h1>
          <div>
            {filteredUsers.length > 0 ? (
              <ul>
                {filteredUsers.map((user) => (
                  <li className={` ${people.user_block} `} key={user.id}>
                    <div></div>
                    <Link to={`/farmers/${user.id}`}>
                      {user.username}
                    </Link> - <p>Направление: {user.farm_type}</p>
                    <p>Город: {user.location}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Пользователи не найдены</p>
            )}
          </div>
        </div>

        <div className={`${people.content_main_right} navTest ${theme}`}>
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
        </div>
      </div>
    </div>
  );
};
export default PeopleFarmers;
