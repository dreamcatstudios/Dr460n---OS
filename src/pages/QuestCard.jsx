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
