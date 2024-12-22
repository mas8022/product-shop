"use client";
import React, { useEffect, useState } from "react";
import { FaHome, FaInfoCircle, FaPhone, FaUserCircle } from "react-icons/fa";
import Side from "../modules/side";
import Image from "next/image";
import useToggle from "../../../utils/useToggle";
import Link from "next/link";
import { ObjectId } from "mongoose";

const MenuBtn = () => {
  const [isOpen, toggleOpen] = useToggle("sidBarUlActivation");
  const [products, setProducts] = useState<
    { name: string; _id: string | ObjectId }[] | undefined
  >();

  useEffect(() => {
    fetch("/api/cms/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  return (
    <Side cls="z-20 sm:hidden" sideBarName="navbarMenuSidebar">
      <div className="w-full h-full p-8 flex flex-col justify-between bg-[#84B8AC] shadow-lg">
        <div className="w-full flex flex-col gap-28">
          <div className="w-full flex flex-col items-center gap-4">
            <Image
              src={"/images/logo.png"}
              width={100}
              height={100}
              alt="logo"
              className="image size-44"
            />
            <h2 className="text-4xl font-bold text-white">برنج سار</h2>
          </div>

          <ul className="flex flex-col gap-6">
            <ul className="flex flex-col pr-8">
              <div
                onClick={(e) => toggleOpen(e)}
                className="flex items-center gap-3.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="4"
                  stroke="currentColor"
                  className={`${isOpen ? "rotate-180" : ""} size-6 text-first`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
                <p className="text-first text-xl">محصولات</p>
              </div>
              <ul
                onClick={(e) => e.stopPropagation()}
                className={`child:text-[1.27rem] flex flex-col text-first font-light overflow-hidden transition-all duration-200 ${
                  isOpen ? "!h-auto  pt-4 gap-2" : "!h-0"
                }`}
              >
                {products?.length &&
                  products.map((item) => (
                    <Link href={`/buy-rice/${item.name}`} key={item._id.toString()}>
                      طارم هاشمی پنج کیلو
                    </Link>
                  ))}
              </ul>
            </ul>

            <Link
              href={"/"}
              className="flex items-center gap-4 text-white font-semibold text-xl hover:bg-white/20 hover:scale-110 transition-all duration-300 ease-in-out p-4 rounded-lg cursor-pointer"
            >
              <FaHome className="h-6 w-6 mr-4" /> خانه
            </Link>
            <Link
              href={"/aboutUs"}
              className="flex items-center gap-4 text-white font-semibold text-xl hover:bg-white/20 hover:scale-110 transition-all duration-300 ease-in-out p-4 rounded-lg cursor-pointer"
            >
              <FaInfoCircle className="h-6 w-6 mr-4" /> درباره ما
            </Link>
            <Link
              href={"/contactUs"}
              className="flex items-center gap-4 text-white font-semibold text-xl hover:bg-white/20 hover:scale-110 transition-all duration-300 ease-in-out p-4 rounded-lg cursor-pointer"
            >
              <FaPhone className="h-6 w-6 mr-4" /> تماس با ما
            </Link>
            <Link
              href={"/profile"}
              className="flex items-center gap-4 text-white font-semibold text-xl hover:bg-white/20 hover:scale-110 transition-all duration-300 ease-in-out p-4 rounded-lg cursor-pointer"
            >
              <FaUserCircle className="h-6 w-6 mr-4" /> پروفایل کاربری
            </Link>
          </ul>
        </div>

        <div className="text-sm text-white/90 font-light text-center mt-6 border-t-2 border-t-white/50 pt-4">
          © 2024 برنجسار
          <br />
          تمامی حقوق محفوظ است.
        </div>
      </div>
    </Side>
  );
};

export default MenuBtn;
