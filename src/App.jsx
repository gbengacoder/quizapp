import { useEffect, useState } from "react";
import questions from "../questions";

function App() {
  const [cur, setCur] = useState(Math.floor(Math.random() * questions.length));
  const [option, setOption] = useState("");
  const [totalScore, setTotalScore] = useState(0);

  const [modalIsShown, setModalIsShown] = useState(false);
  const [answered, setAnswered] = useState(0);
  const [shown, setShown] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const [allQuestion, setAllQuestion] = useState([]);
  const [ansModalIsShown, setAnsModalIsShown] = useState(false);
  const currentQuestion = questions[cur];

  useEffect(() => {
    checkForLast();
  }, [cur, totalScore]);
  const ansHandler = () => {
    if (option == "") {
      return;
    }
    if (option === currentQuestion.correctOption) {
      setCur(cur + 1);
      setTotalScore(totalScore + 1);
      currentQuestion.chosenAnswer = option;
    } else {
      currentQuestion.chosenAnswer = option;
    }
    setCur(Math.floor(Math.random() * questions.length));

    setOption("");
    setShown(shown + 1);
    setAnswered(answered + 1);

    allQuestion.push(currentQuestion);
    console.log(allQuestion);
  };

  const optionsHandler = (ans) => {
    setOption(ans);
  };

  const checkForLast = () => {
    if (shown == 15) {
      setIsFinished(true);
      return;
    }
  };

  const displayHandler = () => {
    if (option == "") {
      return;
    }
    if (option === currentQuestion.correctOption) {
      setTotalScore(totalScore + 1);
    }

    setModalIsShown(true);
    setOption("");
    allQuestion.push(currentQuestion);
  };

  const init = () => {
    setCur(Math.floor(Math.random() * questions.length));
    setIsFinished(false);
    setModalIsShown(false);
    setTotalScore(0);
    setShown(1);
    setAnswered(0);
    setAllQuestion([]);
    setAnsModalIsShown(false);
  };

  const showAnswersModal = () => {
    setAnsModalIsShown(true);
    setModalIsShown(false);
  };

  return (
    <div className="mainContainer">
        {ansModalIsShown && (
          <div className="ansModal">
            <div onClick={() => init()} className="x">
              X
            </div>
            {allQuestion.map((q) => (
              <div className="ansA">
                <div className="ansQ">
                  <p>{q.question}</p>
                </div>
                <div className="ansAns">
                  <p className={"optionA" === q.correctOption ? "green" : ""}>
                    option A: {q.optionA}
                  </p>
                  <p className={"optionB" === q.correctOption ? "green" : ""}>
                    option B: {q.optionB}
                  </p>
                  <p className={"optionC" === q.correctOption ? "green" : ""}>
                    option C: {q.optionC}
                  </p>
                  <p className={"optionD" === q.correctOption ? "green" : ""}>
                    option D {q.optionD}
                  </p>
                </div>
              </div>
            ))}
            <div className="btnX">
              <button onClick={() => init()} className="playAgain">
                Play Again
              </button>
            </div>
          </div>
        )}
      <div className="container">

        {modalIsShown && (
          <div className="scoreModal">
            <div className="content">
              <p>
                You Scored <b>{totalScore} </b> of a possible <b>{15} </b>
              </p>

              <button onClick={() => showAnswersModal()}>Show Answers</button>
              <button onClick={() => init()}>Play Again</button>
            </div>
          </div>
        )}
        {!modalIsShown && !ansModalIsShown && (
          <>
            <div className="top">        
            {shown}/{15} 
         </div>
            <div className="qContainer">{currentQuestion.question}</div>
            <div className="ansContainer">
              <div
                onClick={() => optionsHandler("optionA")}
                className={option == "optionA" ? "selected" : "ans"}
              >
                {" "}
                A:{currentQuestion.optionA}
              </div>
              <div
                onClick={() => optionsHandler("optionB")}
                className={option == "optionB" ? "selected" : "ans"}
              >
                B:{currentQuestion.optionB}
              </div>
              <div
                onClick={() => optionsHandler("optionC")}
                className={option == "optionC" ? "selected" : "ans"}
              >
                C:{currentQuestion.optionC}
              </div>
              <div
                onClick={() => optionsHandler("optionD")}
                className={option == "optionD" ? "selected" : "ans"}
              >
                D:{currentQuestion.optionD}
              </div>
            </div>
            {isFinished ? (
              <button className="btnNext" onClick={() => displayHandler()}>
                Display Score
              </button>
            ) : (
              <button
                className="btnNext"
                disabled={false}
                onClick={() => ansHandler()}
              >
                Next
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
