"use client";
import React, { useEffect, useState } from "react";
import MenuBtn from "./MenuBtn";
import Link from "next/link";
import { ObjectId } from "mongoose";
import { MoonLoader } from "react-spinners";

const UlNavbar = () => {
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
    <>
      <ul className="hidden sm:flex h-16 px-10 items-center gap-10 child:font-bold child:text-2xl child:text-white bg-second rounded-3xl">
        <Link href={"/"}>خانه</Link>

        <ul className="relative group flex gap-2 items-center">
          <li className="dark:text-first">محصولات</li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 group-hover:rotate-180 !dark:invert"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>

          <ul className="w-[23rem] absolute right-0 rounded-xl top-12 mt-4 bg-second shadow-md p-6 flex flex-col gap-y-1 border-y-2 border-y-third invisible opacity-0 group-hover:visible group-hover:opacity-100 group-hover:mt-2 child:cursor-pointer child-hover:bg-black/10 child:rounded-lg child:pr-4 child:h-12 child:flex child:items-center pb-16 delay-100 child:text-first">
            {products?.length ? (
              products.map((item) => (
                <Link
                  href={`/buy-rice/${item.name}`}
                  key={item._id.toString()}
                  className="text-[1.4rem] lg:text-[1.7rem] text-black/90 cursor-pointer active:text-black/20 font-light"
                >
                  {item.name}
                </Link>
              ))
            ) : (
              <p>در حال بارگذاری...</p>
            )}
          </ul>
        </ul>

        <Link href={"/aboutUs"}>درباره ما</Link>
        <Link href={"/contactUs"}>تماس باما</Link>
      </ul>

      <MenuBtn />
    </>
  );
};

export default UlNavbar;
