import React from "react";
import { FaSearch } from "react-icons/fa";

const MainSearch = ({ cls }) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="1500"
      className={`w-full sm:w-1/2 h-32 self-center bg-white/10 backdrop-blur-lg rounded-2xl center px-8 ${cls}`}
    >
      <div className="w-full border-b-2 border-white/40 flex items-center justify-between gap-4 px-4 pb-2">
        <input
          type="text"
          placeholder="چه برنجی می خواهید..."
          className="w-full text-3xl text-white font-bold outline-none focus:outline-none bg-black/0 tsh placeholder:text-first placeholder:tsh"
        />
        <FaSearch
          size={20}
          color="white"
          className="cursor-pointer active:scale-95"
        />
      </div>
    </div>
  );
};

export default MainSearch;
