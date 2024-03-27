import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@/App.css";
import Navbar from "@/components/Navbar";
import Homepage from "@/pages/Homepage";
import QuestCard from "@/pages/QuestCard";
import garuda from "@/assets/garuda.png";

const App = () => {
  console.log("Made by Dreamcatstudios");
  return (
    <BrowserRouter basename="/dragonOS/dist/">
      <div
        className="bg-cover bg-no-repeat opacity-[100%] saturate-50 text-white min-h-screen"
        style={{ backgroundImage: `url(${garuda})` }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/file/:name" element={<QuestCard />} />
          {/* Add more routes for different pages if needed */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
