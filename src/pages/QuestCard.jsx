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
