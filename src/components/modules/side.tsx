"use client";
import React, { useEffect } from "react";
import { useLocalStorage } from "../../../utils/useLocalStorage";
import { HiMenu } from "react-icons/hi";

interface SideProps {
  children: React.ReactNode;
  sideBarName: string;
  cls?: string;
}

const Side: React.FC<SideProps> = ({ children, sideBarName, cls = "" }) => {
  const [sideFlag, setSideFlag] = useLocalStorage(sideBarName, false);

  useEffect(() => {
    const closeSideBarHandler = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        e.target.contains(document.querySelector(".bgActive")!)
      ) {
        setSideFlag(false);
      }
    };

    window.addEventListener("click", closeSideBarHandler);

    return () => {
      window.removeEventListener("click", closeSideBarHandler);
    };
  }, [setSideFlag]);

  return (
    <div className={`${cls}`}>
      <div className="size-14 center bg-second rounded-full">
        <HiMenu
          onClick={() => setSideFlag(true)}
          className="text-white text-4xl"
        />
      </div>
      <div
        className={`w-[21rem] h-screen bg-first shadow-2xl !fixed top-0 transition-all ease-in-out duration-[0.4s] z-[1002] ${
          sideFlag ? "right-0" : "-right-[30rem]"
        }`}
      >
        {children}
      </div>
      <div
        className={
          sideFlag
            ? "bgActive !w-full !h-screen z-[1001] bg-black/20 !fixed !top-0 !left-0"
            : "hidden"
        }
      ></div>
    </div>
  );
};

export default Side;
