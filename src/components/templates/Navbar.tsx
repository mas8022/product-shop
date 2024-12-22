import Image from "next/image";
import React from "react";
import ProfileBtn from "./ProfileBtn";
import UlNavbar from "./UlNavbar";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-40 center py-8 px-6 sm:px-11 z-20">
      <div className="relative z-10 w-full h-full flex items-center justify-between gap-2 rounded-3xl bg-white/10 px-10">
        <div className="-z-10 absolute top-0 left-0 w-full h-full rounded-3xl backdrop-blur-3xl"></div>

        <UlNavbar />

        <div className="h-full flex items-center justify-end gap-2 sm:gap-4">
          {/* <BasketBtn/> */}
          <ProfileBtn />
          <Link href={"/"}>
            <Image
              src={"/images/logo.png"}
              width={50}
              height={50}
              alt="logo"
              className="size-14 sm:size-[5rem]"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
