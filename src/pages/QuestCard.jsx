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

  console.log("decryptedData: ", decryptedData);

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
