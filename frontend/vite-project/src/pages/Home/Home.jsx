import React, { useState, useContext } from "react";
import "./Home.css";
import Topic from "../../components/topic/Topic.jsx";
import Quiz from "../../components/quiz/Quiz.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import LoginPopup from "../../components/Login/Login.jsx";
import { StoreContext } from "../../context/StoreContext";
import Leaderboard from "../leaderboard/leaderboard.jsx";

const Home = () => {
  const { token, selectedTopicTitle, setToken, setSelectedTopicTitle } =
    useContext(StoreContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  console.log(showLeaderboard);
  console.log(token);
  return (
    <div className="home-container">
      {showLogin && (
        <LoginPopup
          setLogin={() => setShowLogin(false)}
          setShowLogin={setShowLogin}
        />
      )}
      <Navbar
        setShowLogin={setShowLogin}
        login={token}
        setLogin={() => setShowLogin(true)}
        setToken={() => setToken("")}
      />
      {showLeaderboard ? (
        <Leaderboard ShowLeaderboard={() => setShowLeaderboard(false)} />
      ) : token ? (
        selectedTopicTitle ? (
          <Quiz
            onRestart={() => setSelectedTopicTitle(false)}
            ShowLeaderboard={() => setShowLeaderboard(true)}
          />
        ) : (
          <Topic ShowLeaderboard={() => setShowLeaderboard(true)} />
        )
      ) : (
        !showLogin && (
          <Topic
            token={token}
            ShowLeaderboard={() => setShowLeaderboard(true)}
          />
        )
      )}
    </div>
  );
};

export default Home;
