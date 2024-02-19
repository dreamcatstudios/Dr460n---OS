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
                    <a
                      onClick={onDownloadClick}
                      href={questData[name].fileDownload}
                      target="_blank"
                      rel="noopener noreferrer" // Added for security and performance reasons
                      className="px-5 py-4 bg-white text-black hover:bg-black hover:border-white hover:border hover:text-white hover:bg-transparent hover:transition-all hover:delay-50 hover:ease-in-out"
                    >
                      {questData[name].fileName}
                    </a>
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
