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
