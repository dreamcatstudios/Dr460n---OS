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
