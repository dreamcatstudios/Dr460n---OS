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
