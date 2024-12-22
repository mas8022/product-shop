import Link from "next/link";
import React from "react";

const PermissionAlert = () => {
  return (
    <div className="w-full h-screen px-8 center">
      <div className="p-14 rounded-3xl shadow-lg bg-second/50 text-white sm:text-5xl text-3xl font-light text-center leading-normal flex flex-col gap-12">
        <span> ابتدا در سایت ثبت نام کنید</span>
        <Link href={"/signup"} className="btn bg-second text-white text-2xl">
          ثبت نام
        </Link>
      </div>
    </div>
  );
};

export default PermissionAlert;
