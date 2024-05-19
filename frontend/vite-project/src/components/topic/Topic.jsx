// Topic.jsx
import { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Topic.css";

const Topic = ({ token, ShowLeaderboard }) => {
  const { topics, fetchSelectedQuestions, setSelectedTopicTitle } =
    useContext(StoreContext);
  const [selectedTopic, setSelectedTopicState] = useState(null);

  const navigateToQuiz = async (topicTitle) => {
    if (!token) {
      toast.error("Please Login First");
    }

    await fetchSelectedQuestions(topicTitle);
    setSelectedTopicTitle(topicTitle);
  };

  const handleTopicSelection = (topic) => {
    setSelectedTopicState(topic.title);
  };

  if (!Array.isArray(topics) || topics.length === 0) {
    return <div>No topics available.</div>;
  }

  if (selectedTopic) {
    return (
      <div className="topic">
        <h2>Selected Topic: {selectedTopic}</h2>
        <button
          onClick={() => setSelectedTopicState(null)}
          className="topic-button"
        >
          Change Topic
        </button>
        <button
          onClick={() => navigateToQuiz(selectedTopic)}
          className="topic-button"
        >
          Start Quiz
        </button>
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="topic">
      <h2>Select a Topic</h2>
      <div className="topic-list">
        {topics.map((topic, index) => (
          <div
            key={index}
            className="topic-item"
            onClick={() => handleTopicSelection(topic)}
          >
            {topic.title}
          </div>
        ))}
      </div>
      <button className="show-leaderboard" onClick={ShowLeaderboard}>
        Show Leader Board
      </button>
    </div>
  );
};

export default Topic;
