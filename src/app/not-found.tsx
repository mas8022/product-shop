"use client"
import React from "react";
import Link from "next/link";
import Aos from "../../utils/Aos";

const NotFoundPage = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center gap-28 pt-40 px-6">
      <Aos />
      <p
        data-aos="fade-up"
        data-aos-duration="500"
        className="text-[20rem] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-[#84B8AC] -mb-40"
      >
        404
      </p>
      <p
        data-aos="fade-up"
        data-aos-duration="1000"
        className="text-light text-black/20 text-5xl tracking-widest"
      >
        این صفحه وجود ندارد
      </p>

      <Link
        data-aos="fade-up"
        data-aos-duration="1200"
        href={"/"}
        className="btn bg-second text-first"
      >
        تماشا محصولات
      </Link>
    </div>
  );
};

export default NotFoundPage;
