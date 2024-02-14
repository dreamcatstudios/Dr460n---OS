import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CryptoJS from "crypto-js"; // Import CryptoJS
import { animateScroll as scroll } from "react-scroll";

const QuestCard = () => {
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);

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

  const selectedQuest = questData[name.toLowerCase()];

  if (!selectedQuest) {
    // Handle invalid difficulty level
    return <div>Invalid level name</div>;
  }

  const onInputClick = (e) => {
    e.stopPropagation();
  };

  const onAnswerSubmit = async () => {
    setLoading(true);
    scrollToTop();

    console.log("name: ", name);
    try {
      const response = await fetch(
        "https://niqqud.com/ctfVerify.php?question=" +
          name +
          "&answer=" +
          userAnswer
      );
      const data = await response.json();

      if (data.status === "correct") {
        toast.success("Correct Answer!!");
        setUserAnswer("");
      } else if (data.status === "incorrect") {
        toast.error("Wrong Answer!!");
        setUserAnswer("");
      } else {
        toast.error("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  ("");

  const onDownloadClick = (e) => {
    e.stopPropagation();
    scrollToTop();
    toast.success("File Downloaded! Check your downloads folder");
  };

  return (
    <div className="bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] h-full w-full min-h-screen">
      <div className="h-full w-full container grid grid-cols-1 items-center justify-center">
        <ToastContainer />
        <div className="w-full h-full flex flex-col justify-center">
          <div className="border h-full w-full border-[#fafafa] p-5 mt-5 mb-5">
            <div className="flex-col">
              <img
                src={selectedQuest.img}
                alt="profile-photo"
                className="w-full h-36 sm:h-64 object-cover mb-2 rounded-sm"
              />
              <h1 className="text-2xl font-bold">{`${selectedQuest.title} (${selectedQuest.points}  Points)`}</h1>
              <h1 className="font-semibold">{selectedQuest.tip}</h1>
            </div>

            <div className="border border-[#fafafa] p-3 space-y-3">
              <div className="flex flex-col gap-4">
                <h1>Download - File</h1>
                <div className="mb-2 sm:mb-0">
                  {questData[name].downloadable ? (
                    <a
                      onClick={onDownloadClick}
                      href={questData[name].fileDownload}
                      className="px-5 py-4 bg-white text-black hover:bg-black hover:border-white hover:border hover:text-white hover:bg-transparent hover:transition-all hover:delay-50 hover:ease-in-out"
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
                <div className="flex gap-3 flex-col mt-2">
                  <div>
                    <p className="font-semibold">
                      1. {selectedQuest.description}
                    </p>
                  </div>
                  <div>
                    <input
                      onChange={(e) => setUserAnswer(e.target.value)}
                      value={userAnswer}
                      onClick={onInputClick}
                      placeholder="Type your answer"
                      className="py-3 pl-2 w-full hover:transition-all hover:duration-75 hover:ease-in-out text-black rounded-sm"
                    />
                  </div>
                  <div>
                    <button
                      onClick={onAnswerSubmit}
                      className="px-3 py-3 w-full bg-gray-800 rounded text-white"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestCard;
