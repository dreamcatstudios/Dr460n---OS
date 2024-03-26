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
                <h1>
                  {questData[name].downloadable
                    ? "Download File"
                    : "Visit Link"}{" "}
                </h1>
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
