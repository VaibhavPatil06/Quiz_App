import React, { useEffect, useState } from "react";
import axios from "axios";
import "./leaderboard.css";
import { StoreContext } from "../../context/StoreContext";

const Leaderboard = ({ ShowLeaderboard }) => {
  const { url } = useContext(StoreContext);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`${url}/api/leaderboard/get`);
        if (Array.isArray(response.data)) {
          setLeaderboard(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard-container">
      <div>
        <button onClick={ShowLeaderboard} className="show-leaderboard">
          Show Topic To Start Quiz
        </button>
      </div>
      <h2>Leaderboard</h2>
      {leaderboard.length > 0 ? (
        leaderboard.map((user, index) => (
          <div className="leaderboard-card" key={index}>
            <div className="leaderboard-card-header">
              <h3>{user.name}</h3>
              <p>
                <strong>Quizzes Attempted:</strong> {user.quizzesAttempted}
              </p>
              <p>
                <strong>Total Score:</strong> {user.totalScore}
              </p>
            </div>
            <div className="leaderboard-card-details">
              {user.quizDetails.map((quiz, qIndex) => (
                <div key={qIndex} className="quiz-details">
                  <h4>Topic :{quiz.quizTitle}</h4>
                  {quiz.scores.map((score, sIndex) => (
                    <p key={sIndex}>
                      <strong>Score :</strong> {score.score}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Leaderboard;
