"use client";
import { useRouter } from "next/navigation";
import useToggle from "../../../utils/useToggle";
import React, { useRef, useState } from "react";
import { useSanitizeInput } from "../../../utils/useSanitizeInput";

const InputSearchNav = () => {
  const router = useRouter();
  const [isOpen, toggleOpen] = useToggle("inputSearchNavActivation");
  const [search, setSearch] = useState("");
  const searchIcon = useRef<HTMLInputElement | null>(null);

  const sanitizedSearch = useSanitizeInput(search) || "";

  const sendDataUrlSearch = () => {
    if (sanitizedSearch.trim()) {
      router.replace(`/products/${sanitizedSearch}`);
    }
    setSearch("");
  };

  const sendDataUrlSearchWithEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && sanitizedSearch.trim()) {
      router.replace(`/products/${sanitizedSearch}`);
      setSearch("");
    }
  };

  return (
    <div
      className={`${
        isOpen
          ? "w-[15rem] sm:w-[20rem] justify-end gap-2"
          : "size-14 sm:size-16 justify-center"
      } p-4 py-2 rounded-full bg-second flex items-center overflow-hidden`}
    >
      <input
        onClick={(e) => e.stopPropagation()}
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        ref={searchIcon}
        onKeyDown={sendDataUrlSearchWithEnter}
        placeholder="چه نوع برنجی..."
        className={`${
          isOpen ? "w-full" : "w-0"
        } h-full text-[1.2rem] xm:text-[1.35rem] dark:text-white outline-none font-light xm:font-bold focus:outline-none bg-second/0 transition-all duration-300 ease-in-out overflow-hidden placeholder-first`}
      />
      <div
        onClick={(e) => {
          if (typeof toggleOpen === "function") {
            toggleOpen(e);
          }
        }}
        className="h-10 sm:h-12 w-8 bg-second/0 flex items-center justify-center rounded-full"
      >
        <svg
          onClick={sendDataUrlSearch}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="cursor-pointer sm:size-10 size-7 active:scale-95 dark:stroke-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default InputSearchNav;
