import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CryptoJS from "crypto-js"; // Import CryptoJS
import { animateScroll as scroll } from "react-scroll";

const QuestCard = () => {
  const [userAnswer, setUserAnswer] = useState("");
  const [totalPoints, setTotalPoints] = useState(0);
  const [maxPoints, setMaxPoints] = useState(0);

  const { name } = useParams();
  const navigate = useNavigate();

  const scrollToTop = () => {
    scroll.scrollToTop({ duration: 150, smooth: true });
  };
  // Define your secret key for decryption
  const decryptionKey = "absd*U#(Eajdn";

  // Encrypted data obtained from pre-encryption step
  const encryptedData =
    "U2FsdGVkX19odPsDHZkNSavBGsNg8ETdnTg7l5NsqWw1X0SqFigfS9vSiRGG3F/HcYlSlGSoOHguqU+FJrwUxUvRqk/Ybwl24h7tE+de6lpm3RAeJxulj/sDw7/z56NiTYyvypLDqg+HVfW7De6i87saORLlaVIqypZ1/Sap3bMBcTM0G9dZEysdrBYrlcErOOqJlZlqbDPPkiAJmPxDm1CAZpC7BueW0kUjst02Dy+yELFwjPZxYtYmRnPuuxX95hh6yHIUuV3jsV61wk1Az3+Zt8AtYfSDYGCwXxehRNaKBfi7+29WDN69Ut90WtvtyzP25DmNmj/JvKC6vGK989/w8PiBTh1fraFdzkM3gBBYoz/UWFiWcrjCI557v7i1hodTJ2v71EnBeahOab5J1llRWeYt5x84yo8dKKE5/+MRV/aoZ3BH5IOcf+pqx7TDcqpdTgCewZs2R+opN77QhpXmugnbfNJw/lKFjrsKA1rXC44oqcQf83GkbnurijBrtae0XSfeCg370SvYuofief7Kmt1ys+jUWc1F8tvvZcKlzipCD0fwGmvyfWwn26qyhBxVvtcavacLVeVpODgvNNIDj62Dn36XCsD8fJ5/xVuXPiqbH+yFqwjdYk5ltWCDgPG2nHSPI64iGK+ivey46J0GrOvNQzAdOJKtMm7LKZbCUrIuR9sBzT5Ga/xnSgO9HWBgTbKzHNhhWN2j6hljuk/qXWQUAfhVdfpuCIyO3mpWQ8Gwo5KF8PaAtnnoFtquTo9o2Tr243z7A8N9bnikc15XUqS/MLAF0RHlju3LtkWKgAl7u4YoRiReUteiP7OxPVot3cmwlcSJ+w0so7qxEBU41CrKm9VBApTR15A0kipe3YOc6fJEf+XIBfNARmavYaFlxZS2791mBG+V058PeeRk1FJ6FbmLUZQZnIC9WoFnz9dltKmnwj0XVnPVHnVLYOMhWjP3Y+hMd95XPXG0ehVtCAIqaLLWgvreTj8g3DijyovjEqkUb4A4HLcR2zvA0ILvTz0z89l/zK0hvLs/WfGWWpEldJKXwH7dYSQy4w9uXsCjtAG2j1i5se1qulB6zDcfNzMwH0DFI7VsAt/7E42BJSeHX6+OmPgKkjDb10NRhBuHv+RCL9w7N7IwXOCRuKVHoXdiaVbD6QjPZ3AK5RA36rUFmZj40xHBTp8yLcCoFYLd5QuLrPPHIkPU8B9RYzbiBSohFQ01sv8U2DFQWiiUh5Zt9x9oznGgNwsnOgA60Cy/G7ecazy9pa2VQ693X0roB8IONSgAxwVLRppqTeowBlywDMLSinjbpxEPZG6Jj8Tu5KKp3iDs/GHv7igN2ch0hH2kfxlp2J0UTo4NjXN/UQt+e2Gn2S0gMPvy+V2marNe7JdL2WrQSAgOti2oDYefGkP/MHFaTk3pxXELMkqPbaVUIhrFXP5dMNC4XZBMUgp4vdyCbL8bt3wt5eMHldPEBWtA5kvflCvOCUyrY2h/HEjFThaXWexd2Ksz5sOEyKtis/L5SXHNYA1Y3HMd+qdtojpRNzBl7uTzkB+c+g+3vWQjFEnNAguT7cfMxWV37fGK6qdI7H3YU/8B5yDbh+bU5h4Hrsouv6/upoTeE7qv+YioFcRc5X/bTSmrv8qVhS+4JAh0p7+EpUnDTKiRN2wL0QVuBTHQqmcj+AcrmTOlU9Dj39ykkZm6ctyj8aLGX7L2djt3QOvp4paeGmGGycQP+CJjA9jF1O5g9haVnEoyXN3Vxpcp8mpc6zMU3PIflKfbYHAA0BQbv6FUO2MXJX2Ax0nNa1ibcdbCIdI1dKr6sTTtbf9w5nCFY5WXrPA=";

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

  const onAnswerSubmit = () => {
    scrollToTop();
    const correctAnswer = selectedQuest["answer"];
    const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();

    if (isCorrect) {
      toast.success("Correct Answer!!");
      setUserAnswer("");
    } else {
      toast.error("Wrong Answer!!");
      setUserAnswer("");
    }
  };

  const onDownloadClick = (e) => {
    e.stopPropagation();
    scrollToTop();
    toast.success("File Downloaded! Check your downloads folder");
  };

  return (
    <div class="bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] h-full w-full min-h-screen">
      <div className="h-full w-full container grid grid-cols-1  items-center justify-cente">
        <ToastContainer />
        <div className="w-full h-full flex flex-col  justify-center">
          <div className="border h-full w-full border-[#fafafa] p-5 mt-5 mb-5">
            <div className="flex-col">
              <img
                src={selectedQuest.img}
                alt="profile-photo"
                className="w-full h-36 sm:h-64 object-cover mb-2 rounded-sm"
              />
              <h1 className="text-2xl font-bold">{selectedQuest.title}</h1>
            </div>
            <div className="mb-2">
              <p className="">{selectedQuest.description}</p>
              <p className=" font-semibold">
                Tip:- Click the question to see options; then select and submit
                your answer (1, 2, or 3). Any other response will be marked
                incorrect.
              </p>
            </div>

            <div className="border border-[#fafafa] p-3 space-y-3">
              <div className="flex flex-col gap-4">
                <h1>Download</h1>
                <div className="mb-2 sm:mb-0">
                  {questData[name].downloadable ? (
                    <a
                      onClick={onDownloadClick}
                      href={questData[name].fileDownload}
                      className="px-5 py-4  bg-white text-black hover:bg-black hover:border-white hover:border hover:text-white hover:bg-transparent hover:transition-all hover:delay-50 hover:ease-in-out"
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
                <div className="flex gap-3 items-center flex-col  align-middle mt-2">
                  <input
                    onChange={(e) => setUserAnswer(e.target.value)}
                    value={userAnswer}
                    onClick={onInputClick}
                    placeholder="Type your answer"
                    className="py-3 pl-2  w-full   hover:transition-all hover:duration-75 hover:ease-in-out text-black rounded-sm"
                  />

                  <button
                    onClick={onAnswerSubmit}
                    className="px-3 py-3 w-full bg-gray-800 rounded text-white"
                  >
                    Submit
                  </button>
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
