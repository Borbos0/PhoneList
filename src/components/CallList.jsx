import React, { useEffect, useState } from "react";
import ".././styles/CallList.css";
import incomingIcon from "../assets/incomingCall.svg";
import outgoingIcon from "../assets/outgoingCall.svg";

const API_URL = "https://api.skilla.ru/mango/getList";
const TOKEN = "testtoken";

const CallList = () => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.results) {
          setCalls(
            data.results.map((call) => ({
              ...call,
              rating: getRandomRating(),
            }))
          );
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке звонков:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Загрузка звонков...</p>;

  return (
    <table className="calls-table">
      <thead>
        <tr>
          <th>Тип</th>
          <th>Время</th>
          <th>Сотрудник</th>
          <th>Звонок</th>
          <th>Источник</th>
          <th>Оценка</th>
          <th>Длительность</th>
        </tr>
      </thead>
      <tbody>
        {calls.map((call) => (
          <tr key={call.id}>
            <td>
              <img
                src={call.in_out === 1 ? incomingIcon : outgoingIcon}
                alt={call.in_out === 1 ? "Входящий" : "Исходящий"}
                className="call-icon"
              />
            </td>
            <td>{new Date(call.date).toLocaleTimeString()}</td>
            <td>
              <img src={call.person_avatar} alt="Аватар" className="avatar" />
            </td>
            <td>{call.from_number}</td>
            <td>{call.source}</td>
            <td>
              <span className={`rating ${getRatingClass(call.rating)}`}>
                {call.rating}
              </span>
            </td>
            <td>{formatDuration(call.time)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const getRandomRating = () => {
  const ratings = ["Отлично", "Хорошо", "Плохо"];
  return ratings[Math.floor(Math.random() * ratings.length)];
};

const getRatingClass = (rating) => {
  const ratingClasses = {
    Отлично: "excellent",
    Хорошо: "good",
    Плохо: "bad",
  };
  return ratingClasses[rating] || "";
};

const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${minutes}:${sec < 10 ? "0" : ""}${sec}`;
};

export default CallList;
