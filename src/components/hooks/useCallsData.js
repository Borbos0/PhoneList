import { useState, useEffect } from "react";
import axios from "axios";
import { getRandomRating } from "../utils/utils";

const API_URL = "https://api.skilla.ru/mango/getList";
const RECORD_API_URL = "https://api.skilla.ru/mango/getRecord";
const TOKEN = "testtoken";

const useCallsData = (fromDate, toDate, filterType) => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [audioUrls, setAudioUrls] = useState({});

  const fetchCalls = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}?date_start=${fromDate}&date_end=${toDate}`,
        {
          in_out:
            filterType === "incoming" ? 1 : filterType === "outgoing" ? 0 : null,
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      if (data.results) {
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
    } catch (error) {
      console.error("Ошибка при загрузке звонков:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCalls();
  }, [fromDate, toDate, filterType]);

  return { calls, loading, audioUrls, fetchCalls };
};

export default useCallsData;
