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

  console.log("decryptedData: ", decryptedData);

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
