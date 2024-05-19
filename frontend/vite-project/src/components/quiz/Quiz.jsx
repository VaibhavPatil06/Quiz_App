import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext.jsx";
import "./Quiz.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Quiz = ({ onRestart, ShowLeaderboard }) => {
  const navigate = useNavigate();
  const { selectedQuestions, selectedTopicTitle, token, url } =
    useContext(StoreContext);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);

  useEffect(() => {
    if (selectedQuestions.length > 0) {
      setUserAnswers(Array(selectedQuestions.length).fill(null));
    }
  }, [selectedQuestions]);

  const handleOptionSelect = (questionIndex, optionIndex) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex] = optionIndex;
    setUserAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    setShowResult(true);

    // Calculate the score and incorrect answers
    let correct = 0;
    const incorrectAnswersList = [];
    selectedQuestions.forEach((question, index) => {
      if (
        userAnswers[index] !== null &&
        question.options[userAnswers[index]].isCorrect
      ) {
        correct++;
      } else if (userAnswers[index] !== null) {
        incorrectAnswersList.push({
          question: question.questions,
          correctAnswer: question.options.find((opt) => opt.isCorrect)?.option,
          selectedAnswer: question.options[userAnswers[index]]?.option,
        });
      }
    });

    setCorrectCount(correct);
    setIncorrectAnswers(incorrectAnswersList);

    // Send the score to the server
    try {
      const response = await axios.post(
        `${url}/api/quiz/submit`,
        {
          topic: selectedTopicTitle,
          score: correct,
          total: selectedQuestions.length,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.data.success) {
        alert("Failed to submit score: " + response.data.message);
      }
    } catch (error) {
      console.error("Error submitting score", error);
      alert(
        "Error submitting score. Please check if the backend server is running and accessible."
      );
    }
  };

  const resetQuiz = () => {
    setUserAnswers([]);
    setShowResult(false);
    setCorrectCount(0);
    setIncorrectAnswers([]);
  };

  return (
    <div className="quiz-container">
      <h1>Quiz</h1>
      {!showResult &&
        selectedQuestions.map((question, questionIndex) => (
          <div key={questionIndex} className="question">
            <h3>{question.questions}</h3>
            <ul>
              {question.options.map((option, optionIndex) => (
                <li key={optionIndex}>
                  <label>
                    <input
                      type="radio"
                      name={`question${questionIndex}`}
                      value={optionIndex}
                      checked={userAnswers[questionIndex] === optionIndex}
                      onChange={() =>
                        handleOptionSelect(questionIndex, optionIndex)
                      }
                    />
                    {option.option}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      {!showResult && (
        <button className="submit-button" onClick={handleSubmit}>
          Submit Quiz
        </button>
      )}
      {showResult && (
        <div className="result-container">
          <h2>Result</h2>
          <h3>
            Score: {correctCount} out of {selectedQuestions.length}
          </h3>
          <h3>Incorrect Answers:</h3>
          <ul>
            {incorrectAnswers.map((answer, index) => (
              <li key={index} className="incorrect-question">
                <p>{answer.question}</p>
                <p>
                  <span className="correct-answer-label">Correct Answer:</span>{" "}
                  <span className="correct-answer">{answer.correctAnswer}</span>
                </p>
                <p>
                  <span className="selected-answer-label">Your Answer:</span>{" "}
                  <span className="selected-answer">
                    {answer.selectedAnswer}
                  </span>
                </p>
              </li>
            ))}
          </ul>
          <button className="reset-button" onClick={resetQuiz}>
            Restart Quiz
          </button>
          <button onClick={ShowLeaderboard} className="show-leaderboard">
            Show Leader Board
          </button>
        </div>
      )}
      {showResult && (
        <button className="restart-button" onClick={onRestart}>
          Choose Another Topic
        </button>
      )}
    </div>
  );
};

export default Quiz;
