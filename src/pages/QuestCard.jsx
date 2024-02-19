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
