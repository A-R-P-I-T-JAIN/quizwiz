import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate} from "react-router-dom";
import "./css/game.css";
import correctSound from './audio/correct.wav'
import incorrectSound from './audio/incorrect2.wav'
import kbc from './audio/kbc.mp3'

function Game() {
  const { category } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currQuestion, setCurrQuestion] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, [category]);

  useEffect(() => {
    if (questions.length > 0) {
      setOptions(
        questions &&
          handleShuffle([
            questions[currQuestion]?.correct_answer,
            ...questions[currQuestion]?.incorrect_answers,
          ])
      );
    }
  }, [questions, currQuestion]);

  const handleShuffle = (options) => {
    const shuffledOptions = [...options];
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOptions[i], shuffledOptions[j]] = [
        shuffledOptions[j],
        shuffledOptions[i],
      ];
    }
    return shuffledOptions;
  };

  const decodeEntities = (text) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  };

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${category || '9'}&type=multiple`
      );
      const data = await response.json();
      const decodedQuestions = data.results.map((question) => ({
        ...question,
        question: decodeEntities(question.question),
      }));
      setQuestions(decodedQuestions);
    } catch (error) {
      console.log(error);
    }
  };

  const checkAnswer = (option) => {
    setSelectedOption(option);
    if (option === questions[currQuestion].correct_answer) {
      setScore(score + 1);
      new Audio(correctSound).play();
    } else {
      new Audio(incorrectSound).play()
      const correctAnswerIndex = options.findIndex(
        (answer) => answer === questions[currQuestion].correct_answer
      );
      const correctAnswerButton = document.getElementById(
        `option-${correctAnswerIndex}`
      );
  
      if (correctAnswerButton) {
        correctAnswerButton.classList.add("green");
      }
    }
  };

  const handleNext = () => {
    if (currQuestion < 9) {
      new Audio(kbc).play();
      setCurrQuestion(currQuestion + 1);
      setSelectedOption();

      // Find the index of the correct answer in the options array
    const correctAnswerIndex = options.findIndex(
      (answer) => answer === questions[currQuestion].correct_answer
    );

    // Get the button element of the correct answer
    const correctAnswerButton = document.getElementById(
      `option-${correctAnswerIndex}`
    );

    // Remove the "green" class from the correct answer button
    if (correctAnswerButton) {
      correctAnswerButton.classList.remove("green");
    }
  } else {
    const finalScore = score;
    navigate("/Result",{state: finalScore?finalScore:'0'});
  }

  };


  return (
    <div className="game_sec">
      <div className="container">
        <div className="top">
          <h1>25</h1>
          <i className="fa-sharp fa-solid fa-arrow-right-from-line"></i>
        </div>
        <h1 className="score">Score: {score}</h1>
        <div className="quiz">
          {questions.length > 0 ? (
            <div>
              <div className="ques">
                <p>
                  {currQuestion + 1}. {questions[currQuestion].question}
                </p>
              </div>
              <div className="options">

                <button onClick={() => checkAnswer(options[0])} id={selectedOption === options[0] && options[0] === questions[currQuestion].correct_answer?'correct':selectedOption === options[0]?'incorrect':`option-0`}  disabled={selectedOption !== undefined}>
                  {options[0]}
                </button>

                <button onClick={() => checkAnswer(options[1])} id={selectedOption === options[1] && options[1] === questions[currQuestion].correct_answer?'correct':selectedOption === options[1]?'incorrect':`option-1`}  disabled={selectedOption !== undefined}>
                  {options[1]}
                </button>

              </div>

              <div className="options">

                <button onClick={() => checkAnswer(options[2])} id={selectedOption === options[2] && options[2] === questions[currQuestion].correct_answer?'correct':selectedOption === options[2]?'incorrect':`option-2`} disabled={selectedOption !== undefined}>
                  {options[2]}
                </button>

                <button onClick={() => checkAnswer(options[3])} id={selectedOption === options[3] && options[3] === questions[currQuestion].correct_answer?'correct':selectedOption === options[3]?'incorrect':`option-3`}  disabled={selectedOption !== undefined}>
                  {options[3]}
                </button>

              </div>

              <center>
                <button onClick={handleNext} className="next">
                  Next
                </button>
              </center>
            </div>
          ) : (
            <p className="load">Loading questions...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Game;
