import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { fetchEvents } from "../../../store/events/eventsSlice";

const EventsDetails: React.FC = () => {
  const { _id } = useParams<{ _id: string }>();
  const dispatch = useAppDispatch();
  const { event, isLoading, hasError } = useAppSelector((state) => state.event);

  useEffect(() => {
    if (_id) {
      dispatch(fetchEvents());
    }
  }, [dispatch, _id]);

  if (isLoading) return <div>Загрузка...</div>;
  if (hasError) return <div>Ошибка загрузки...</div>;

  if (!event) return <div>Событие не найдено</div>;
  return (
    <>
      <h1> детальная страница</h1>
    </>
  );
};
export default EventsDetails;
