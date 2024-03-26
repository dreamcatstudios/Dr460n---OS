import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import { FadeLoader } from "react-spinners";
import folderIcon from "@/assets/folder.png";
import garuda from "@/assets/garuda.png";


const Homepage = () => {
  const levels = [
    { bg: folderIcon, level: "1", title: "Flag_01" },
    { bg: folderIcon, title: "Flag_02" },
    { bg: folderIcon, title: "Flag_03" },
    { bg: folderIcon, title: "Flag_04" },
    { bg: folderIcon, title: "Flag_05" },
    { bg: folderIcon, title: "Flag_06" },
    { bg: folderIcon, title: "Flag_07" },
    { bg: folderIcon, title: "Flag_08" },
    { bg: folderIcon, title: "Flag_09" },
    { bg: folderIcon, title: "Flag_10" },
    { bg: folderIcon, title: "Flag_11" },
    { bg: folderIcon, title: "Flag_12" },
    { bg: folderIcon, title: "Flag_13" },
    { bg: folderIcon, title: "Flag_14" },
    { bg: folderIcon, title: "Flag_15" },
    { bg: folderIcon, title: "Flag_16" },
    { bg: folderIcon, title: "Flag_17" },
    { bg: folderIcon, title: "Flag_18" },
    { bg: folderIcon, title: "Flag_19" },
    { bg: folderIcon, title: "Flag_20" },
  ];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore");
    if (hasVisitedBefore) {
      // User has visited before, so set loading to false immediately
      setLoading(false);
    } else {
      // User is visiting for the first time, show the loader and set a flag
      const timer = setTimeout(() => {
        setLoading(false);
        localStorage.setItem("hasVisitedBefore", "true");
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, []);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div
      style={{ backgroundImage: `url(${garuda})` }}
      className="flex flex-col h-screen brightness-75 bg-cover container"
    >
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <FadeLoader color="#ffffff" css={override} size={15} />
        </div>
      )}
      {!loading && (
        <div className="flex flex-col h-[95%] gap-12 p-6 w-0 flex-wrap">
          {levels.map((item, index) => (
            <Link
              key={index}
              to={`/file/${item.title.toLowerCase().replace(/\s+/g, "")}`}
            >
              <div
                className="btn-img bg-cover bg-no-repeat sm:w-20 sm:h-20 h-14 w-14 hover:brightness-75"
                style={{ backgroundImage: `url(${item.bg})` }}
              >
                <h1 className="text-center text-sm sm:text-base sm:whitespace-nowrap pt-[60px] sm:pt-[82px]">
                  {item.title}
                </h1>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Homepage;
