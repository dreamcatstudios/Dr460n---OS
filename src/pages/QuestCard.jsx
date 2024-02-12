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
              <h1 className="text-2xl font-bold">{`${selectedQuest.title} (${selectedQuest.points}  Points)`}</h1>
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
