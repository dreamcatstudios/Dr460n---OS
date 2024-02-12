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
              <h1 className="text-2xl font-bold">{selectedQuest.title}</h1>
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
