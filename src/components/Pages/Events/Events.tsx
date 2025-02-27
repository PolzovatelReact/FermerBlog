import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { useSelector } from "react-redux";
import { fetchEvents } from "../../../store/events/eventsSlice";
import DOMPurify from "dompurify";
import styles from "./style.module.css";

import "./../../../index.css"; // здесь переключатель темы
import { RootState } from "../../../store";

const Events: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme.theme); //переключение темы
  const dispatch = useAppDispatch();
  const { event, isLoading, hasError } = useAppSelector((state) => state.event);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);
  if (isLoading) return <div> Загрузка...</div>;
  if (hasError) return <div> Ошибка загрузки ...</div>;
  return (
    <section>
      <h1> События</h1>
      {event.map((eventItem) => (
        <div key={eventItem.id}>
          <h3>{eventItem.title}</h3>
          <p>{eventItem.description}</p>
          <p>Дата: {eventItem.date}</p>
          <Link to={`/people/${eventItem.id}`}>Подробнее</Link>
          <p>Полтзователь: {eventItem.userId}</p>
          <Link to={`/events/${eventItem.id}`}>Подробнее</Link>
        </div>
      ))}
    </section>
  );
};
export default Events;
