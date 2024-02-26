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
    "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"

  // Decrypt the encrypted data using AES decryption
  const bytes = CryptoJS.AES.decrypt(encryptedData, decryptionKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  // Use the decrypted data as your questData object
  const [questData, setQuestData] = useState(decryptedData);

  const selectedQuest = questData[name.toLowerCase()];

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

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
    console.log("Downloaded!", e);
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
            </div>

            <div className="border border-[#fafafa] p-3 space-y-3">
              <div className="flex flex-col gap-4">
                <h1>Download - File</h1>
                <div className="mb-2 sm:mb-0">
                  {questData[name].downloadable ? (
                    <button
                      onClick={() => openInNewTab(questData[name].fileDownload)}
                      className="px-5 py-4 bg-white text-black hover:bg-black hover:border-white hover:border hover:text-white hover:bg-transparent hover:transition-all hover:delay-50 hover:ease-in-out"
                    >`  `
                      {questData[name].fileName}
                    </button>
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
                    <p className="font-semibold">{selectedQuest.description}</p>
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
