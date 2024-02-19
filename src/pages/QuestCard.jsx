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
