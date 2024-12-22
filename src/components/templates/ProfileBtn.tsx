"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Bg from "../modules/Bg";
import { MoonLoader } from "react-spinners";
import { FaUser } from "react-icons/fa";
import { logoutHandler } from "../../../utils/authTools";
const ProfileBtn = () => {
  const [slideProfile, setSlideProfile] = useState(false);
  const [isPending, setIsPendingMe] = useState(false);
  const [roll, setRollMe] = useState("USER");
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    fetch("/api/resetToken")
      .then((res) => {
        setIsPendingMe(true);
        return res.json();
      })
      .then((result) => {
        setRollMe(result.roll);
        setFetched(true);
      });
  }, [slideProfile]);

  return !fetched ? (
    <MoonLoader size={30} color="#ffffff" />
  ) : (
    <>
      {roll === "USER" || roll === "ADMIN" ? (
        <>
          <div className="cursor-pointer relative">
            <div onClick={() => setSlideProfile((p) => !p)}>
              <div className="flex p-[9px] sm:p-[10px] rounded-full bg-second items-center justify-center cursor-pointer">
                <FaUser
                  className="size-7 sm:size-9 cursor-pointer stroke-white"
                  style={{ strokeWidth: 40, fill: "none" }}
                />
              </div>
            </div>
            <div
              className={`z-[10000] flex flex-col gap-10 items-center p-10 absolute top-24 -left-20 w-[30rem] bg-second border-y-2 border-third rounded-3xl transition-all duration-300 ${
                slideProfile
                  ? "visible opacity-100 mt-4"
                  : "opacity-0 invisible mt-0"
              }`}
            >
              <div className="w-full flex flex-col gap-6 font-bold child:text-[1.4rem] child:font-light child:pb-2 child:text-white bg-white/0 child:flex child:items-center child:justify-between child:border-b-[1px] child:border-b-black/10 dark:child:border-b-[#cbd5e1]/40 child:rounded-b-md child:px-2">
                {roll === "ADMIN" ? (
                  <Link href="/cms" onClick={() => setSlideProfile(false)}>
                    پیشخوان مدیریت
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-10"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                      />
                    </svg>
                  </Link>
                ) : null}
                <Link href={`/profile`}>
                  پروفایل
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </Link>
                <Link href={"/orders"}>
                  سفارشات من
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-9 ml-[2px]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                    />
                  </svg>
                </Link>
                <div onClick={logoutHandler}>
                  خروج از حساب کاربری
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-10 stroke-red-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <Bg active={slideProfile} setActive={setSlideProfile} />
        </>
      ) : (
        <>
          <Link
            href={"/login"}
            className={`flex p-[9px] rounded-full bg-second items-center justify-center cursor-pointer ${
              isPending ? "" : "pointer-events-none"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={"1.4"}
              stroke="black"
              className="sm:size-10 size-7 active:scale-95 dark:invert"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
          </Link>
        </>
      )}
    </>
  );
};

export default ProfileBtn;
