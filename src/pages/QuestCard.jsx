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
