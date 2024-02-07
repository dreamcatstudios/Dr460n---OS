import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CryptoJS from "crypto-js"; // Import CryptoJS
import { animateScroll as scroll } from "react-scroll";

const QuestCard = () => {
  const [userAnswer, setUserAnswer] = useState("");
  const [totalPoints, setTotalPoints] = useState(0);
  const [maxPoints, setMaxPoints] = useState(0);

  const [questionStatus, setQuestionStatus] = useState({});
  const { name } = useParams();
  const navigate = useNavigate();

  const scrollToTop = () => {
    scroll.scrollToTop({ duration: 150, smooth: true });
  };
  // Define your secret key for decryption
  const decryptionKey = "absd*U#(Eajdn";

  // Encrypted data obtained from pre-encryption step
  const encryptedData =
    "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";

  // Decrypt the encrypted data using AES decryption
  const bytes = CryptoJS.AES.decrypt(encryptedData, decryptionKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  // Use the decrypted data as your questData object
  const [questData, setQuestData] = useState(decryptedData);

  const onClickExpand = (index) => {
    setQuestData((prevState) => ({
      ...prevState,
      [name.toLowerCase()]: {
        ...prevState[name.toLowerCase()],
        learningPath: prevState[name.toLowerCase()].learningPath.map(
          (item, i) =>
            i === index ? { ...item, clicked: !item.clicked } : item
        ),
      },
    }));
  };

  const selectedQuest = questData[name.toLowerCase()];

  if (!selectedQuest) {
    // Handle invalid difficulty level
    return <div>Invalid level name</div>;
  }

  const onInputClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const storedQuestionStatus = localStorage.getItem(
      `${name.toLowerCase()}_question_status`
    );

    setQuestionStatus((prevQuestionStatus) => ({
      ...prevQuestionStatus,
      ...(storedQuestionStatus ? JSON.parse(storedQuestionStatus) : {}),
    }));
  }, [name]);

  useEffect(() => {
    localStorage.setItem(
      `${name.toLowerCase()}_question_status`,
      JSON.stringify(questionStatus)
    );
  }, [name, questionStatus]);

  const onAnswerSubmit = (index) => {
    scrollToTop();
    const correctAnswer = selectedQuest.learningPath[index].answer;
    const currentQuest = questData[name.toLowerCase()];

    if (questionStatus[index] !== undefined) {
      toast.error("You have already answered this question.");
      return;
    }

    const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();

    setQuestionStatus((prev) => ({
      ...prev,
      [index]: isCorrect,
    }));

    toast.success(isCorrect ? "Answer Submitted!!" : "Answer Submitted!!");

    if (isCorrect) {
      const updatedPoints = currentQuest.points + 1;
      setQuestData((prevState) => ({
        ...prevState,
        [name.toLowerCase()]: {
          ...currentQuest,
          points: updatedPoints,
          learningPath: currentQuest.learningPath.map((item, i) =>
            i === index ? { ...item, clicked: true, disabled: true } : item
          ),
        },
      }));

      setTotalPoints((prevTotalPoints) => prevTotalPoints + 1);
    } else {
      setQuestData((prevState) => ({
        ...prevState,
        [name.toLowerCase()]: {
          ...currentQuest,
          learningPath: currentQuest.learningPath.map((item, i) =>
            i === index ? { ...item, clicked: true, disabled: true } : item
          ),
        },
      }));
    }
  };

  const onDownloadClick = (e) => {
    e.stopPropagation();
    scrollToTop();
    toast.success("File Downloaded! Check your downloads folder");
  };

  const finishData = () => {
    // Check if all questions are answered
    scrollToTop();
    const answeredQuestions = Object.keys(questionStatus).map(Number);

    if (answeredQuestions.length === selectedQuest.learningPath.length) {
      // Calculate maxPoints
      const maxPoints = selectedQuest.learningPath.length;
      setMaxPoints(maxPoints);

      // Extract correct and incorrect indices
      const correctIndices = answeredQuestions.filter(
        (index) => questionStatus[index]
      );
      const incorrectIndices = answeredQuestions.filter(
        (index) => !questionStatus[index]
      );

      // Send data to Scores component
      const dataToSend = {
        correct: correctIndices,
        incorrect: incorrectIndices,
        questions: selectedQuest.learningPath.map((item) => item.title),
        explanation: selectedQuest.learningPath.map((item, index) =>
          questionStatus[index] ? "" : item.explanation
        ),
      };

      // Use history object to navigate and send data as state
      navigate("/scores", { state: { data: dataToSend } });
    } else {
      toast.error("Please answer all questions before finishing.");
    }
  };

  return (
    <div class="bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] h-full w-full">
      <div className="h-full w-full container flex flex-col justify-center items-center">
        <ToastContainer />
        <div className="w-full h-full flex flex-col justify-between ">
          <div className="border border-[#fafafa] p-5 mt-5 mb-5">
            <div className="flex-col">
              <img
                src={selectedQuest.img}
                alt="profile-photo"
                className="w-full h-36 sm:h-64 object-cover mb-2 rounded-sm"
              />
              <h1 className="text-2xl font-bold">{selectedQuest.title}</h1>
            </div>
            <div className="mb-2">
              <p className="">{selectedQuest.description}</p>
              <p className=" font-semibold">
                Tip:- Click the question to see options; then select and submit
                your answer (1, 2, or 3). Any other response will be marked
                incorrect.
              </p>
            </div>

            <div className="border border-[#fafafa] p-3 space-y-3">
              <div className="flex flex-col gap-4">
                <h1>{questData[name].downloadTag}</h1>
                <div className="mb-2 sm:mb-0">
                  {questData[name].downloadable ? (
                    <a
                      onClick={onDownloadClick}
                      href={questData[name].fileDownload}
                      className="px-5 py-4  bg-white text-black hover:bg-black hover:border-white hover:border hover:text-white hover:bg-transparent hover:transition-all hover:delay-50 hover:ease-in-out"
                    >
                      {questData[name].fileName}
                    </a>
                  ) : (
                    <Link
                      to={questData[name].fileDownload}
                      onClick={onDownloadClick}
                      className="px-5 py-4 bg-white text-black hover:bg-black hover:border-white hover:border hover:text-white hover:bg-transparent hover:transition-all hover:delay-50 hover:ease-in-out"
                    >
                      {questData[name].fileName}
                    </Link>
                  )}
                </div>
              </div>
              {selectedQuest.learningPath.map((item, index) => (
                <div className="flex flex-col gap-3 w-full" key={item.level}>
                  {questionStatus[index] === undefined ? (
                    item.disabled ? (
                      <div className="bg-gray-800  items-center p-5 mt-2 rounded-sm flex-col">
                        <p className="text-white">{`${item.level} - This item has already been answered`}</p>
                        {/* You can display a message or any other content for disabled items */}
                      </div>
                    ) : (
                      <div
                        onClick={() => onClickExpand(index)}
                        className="bg-gray-800 items-center p-5 mt-1 sm:mt-3 rounded-sm flex-col"
                      >
                        <div className="flex justify-between">
                          <p className="text-white">{`${item.level} - ${item.title}`}</p>
                          {item.clicked ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              width={"1.2rem"}
                              height={"1.2rem"}
                            >
                              <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              width={"1.2rem"}
                              height={"1.2rem"}
                            >
                              <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
                            </svg>
                          )}
                        </div>

                        {item.clicked && (
                          <>
                            <p>{item.options}</p>
                            <div className="flex gap-3 items-center flex-col sm:flex-row align-middle mt-2">
                              <input
                                onChange={(e) => setUserAnswer(e.target.value)}
                                onClick={onInputClick}
                                placeholder="Type your answer"
                                className="h-5 p-5 pb-5 pl-2 w-full sm:w-auto  hover:transition-all hover:duration-75 hover:ease-in-out text-black rounded-sm"
                              />

                              <button
                                onClick={() => onAnswerSubmit(index)}
                                className="px-3 py-2 w-full sm:w-auto bg-black rounded text-white"
                              >
                                Submit
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    )
                  ) : (
                    <div className="bg-gray-800  items-center p-5 mt-2 rounded-sm flex-col">
                      <p className="text-white">{`${item.level} - This item has already been answered`}</p>
                      {/* You can display a message or any other content for disabled items */}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={finishData}
            className="bg-[#fafafa] text-black p-3 mb-16 sm:mb-12  hover:text-white hover:bg-black hover:transition-all hover:delay-75 hover:ease-in-out hover:border-white hover:border"
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestCard;
