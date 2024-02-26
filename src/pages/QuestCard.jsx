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
