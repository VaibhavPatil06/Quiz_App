// StoreContext.jsx
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

export const StoreContextProvider = ({ children }) => {
  const [token, setToken] = useState("");

  const urlbase = import.meta.env;
  const url = urlbase.VITE_REACT_APP_URL;
  console.log(urlbase);
  console.log(url);
  const [topics, setTopics] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [selectedTopicTitle, setSelectedTopicTitle] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.post(url + "/api/quiz/title");
        setTopics(response.data);
      } catch (error) {
        console.error("Failed to fetch topics:", error);
      }
    };

    fetchTopics();
  }, []);

  const fetchSelectedQuestions = async (topicTitle) => {
    try {
      const response = await axios.post(url + "/api/quiz/get", {
        title: topicTitle,
      });
      const shuffledQuestions = shuffleArray(response.data);
      setSelectedQuestions(shuffledQuestions);
      setSelectedTopicTitle(topicTitle);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    }
  };
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <StoreContext.Provider
      value={{
        token,
        setToken,
        topics,
        selectedQuestions,
        fetchSelectedQuestions,

        url,
        selectedTopicTitle,
        setSelectedTopicTitle,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
