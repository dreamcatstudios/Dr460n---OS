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
                    >
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
