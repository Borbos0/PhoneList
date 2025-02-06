import { useState, useEffect } from "react";
import axios from "axios";
import { getRandomRating } from "../utils/utils";

const API_URL = "https://api.skilla.ru/mango/getList";
const RECORD_API_URL = "https://api.skilla.ru/mango/getRecord";
const TOKEN = "testtoken";

const useCallsData = () => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [audioUrls, setAudioUrls] = useState({});

  useEffect(() => {
    // Загрузка списка звонков с использованием axios
    axios
      .post(
        API_URL,
        {},
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (response) => {
        const data = response.data;
        if (data.results) {
          // Добавление случайного рейтинга
          setCalls(
            data.results.map((call) => ({
              ...call,
              rating: getRandomRating(),
            }))
          );

          const audioMap = {};
          for (const call of data.results) {
            if (call.record) {
              try {
                const recordResponse = await axios.post(
                  `${RECORD_API_URL}?record=${call.record}&partnershipId=${call.partnership_id}`,
                  {},
                  {
                    headers: {
                      Authorization: `Bearer ${TOKEN}`,
                      "Content-Type": "application/json",
                    },
                    responseType: "blob",
                  }
                );
                audioMap[call.id] = URL.createObjectURL(recordResponse.data);
              } catch (error) {
                console.error("Ошибка загрузки аудиозаписи:", error);
              }
            }
          }
          setAudioUrls(audioMap);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке звонков:", error);
        setLoading(false);
      });
  }, []);

  return { calls, loading, audioUrls };
};

export default useCallsData;
