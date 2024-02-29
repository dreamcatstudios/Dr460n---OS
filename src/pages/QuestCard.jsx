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
