"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import FooterCommentBox from "./FooterCommentBox";
import { ObjectId } from "mongoose";

const Footer = () => {
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
    <div className="w-full flex flex-col items-center bg-gradient-to-b from-[#D8E27C] to-[#84B8AC] footer-shadow">
      <div className="w-full h-auto lg:h-[42rem] px-6 sm:px-[5rem] lg:px-[3rem] xl:px-[15rem] flex flex-col mmd:flex-row justify-between items-center mmd:items-start py-20 gap-16 lg:gap-8">
        <div className="w-full h-full flex flex-col justify-between gap-8 lg:gap-16">
          <div className="w-full flex flex-wrap gap-20 mmd:justify-start sm:justify-center justify-start">
            <ul className="w-96 flex flex-col">
              <p className="text-[1.7rem] lg:text-[2rem] border-b-[1px] border-black/50 mb-4">
                نشانی و ادرس
              </p>
              <li className="mb-4 text-[1.4rem] lg:text-[1.7rem] text-black/90 cursor-pointer active:text-black/20 font-light">
                شرکت ما به صورت انلاین فعالیت می کند و به دلیل تازه تاسیس بودن
                اداره ای در حال حاضر برایش وجود ندارد
              </li>
              <li className="text-[1.4rem] lg:text-[1.7rem] text-black/90 cursor-pointer active:text-black/20 font-light">
                0911-318-5137
              </li>
              <li className="text-[1.4rem] lg:text-[1.7rem] text-black/90 cursor-pointer active:text-black/20 font-light">
                0935-646-3352
              </li>
            </ul>
            <ul className="flex flex-col">
              <p className="text-[1.7rem] lg:text-[2rem] border-b-[1px] border-black/50 mb-4">
                محصولات
              </p>
              {products?.length &&
                products.map((item) => (
                  <Link
                    href={`/buy-rice/${item.name}`}
                    key={item._id.toString()}
                    className="text-[1.4rem] lg:text-[1.7rem] text-black/90 cursor-pointer active:text-black/20 font-light"
                  >
                    {item.name}
                  </Link>
                ))}
            </ul>

            <ul className="flex flex-col">
              <p className="text-[1.7rem] lg:text-[2rem] border-b-[1px] border-black/50 mb-4">
                دسترسی سریع
              </p>
              <Link
                href={"/"}
                className="text-[1.4rem] lg:text-[1.7rem] text-black/90 cursor-pointer active:text-black/20 font-light"
              >
                خانه
              </Link>

              <Link
                href={"/contactUs"}
                className="text-[1.4rem] lg:text-[1.7rem] text-black/90 cursor-pointer active:text-black/20 font-light"
              >
                تماس با ما
              </Link>
              <Link
                href={"/aboutUs"}
                className="text-[1.4rem] lg:text-[1.7rem] text-black/90 cursor-pointer active:text-black/20 font-light"
              >
                درباره ما
              </Link>
              <Link
                href={"/rule"}
                className="text-[1.4rem] lg:text-[1.7rem] text-black/90 cursor-pointer active:text-black/20 font-light"
              >
                قوانین و مقررات
              </Link>
            </ul>
          </div>
          <div className="flex sm:flex-row flex-row-reverse gap-8">
            <Image
              src={"/images/logo.png"}
              placeholder="blur"
              blurDataURL={"/images/logo.png"}
              width={100}
              height={100}
              priority={true}
              alt="site logo"
              className="size-28 object-cover rounded-3xl"
            />
            <span className="text-[1.4rem] line-clamp-4">
              در برنجسار اصالت و کیفیت حرف اول را می‌زند. تمامی برنج‌های ما از
              دل مزارع سرسبز مازندران تهیه می‌شوند، جایی که کشاورزان باتجربه با
              دقت و دانش خود برنجی اصیل و خالص تولید می‌کنند. ما متعهدیم که طعم
              و عطر واقعی برنج ایرانی را به سفره‌های شما بیاوریم تا لحظات خوشی
              را در کنار خانواده تجربه کنید.
            </span>
          </div>
        </div>

        <div className="w-[50rem] max-[520px]:w-full h-[30rem] lg:h-full flex flex-col justify-between gap-10">
          <FooterCommentBox />

          <div className="flex justify-end gap-4">
            <Link href={"/"}>
              <Image
                src={"/images/enamad.png"}
                placeholder="blur"
                blurDataURL={"/images/enamad.png"}
                width={100}
                height={100}
                alt="نماد اعتماد الکترونیک"
                className="size-32 lg:size-40 object-cover rounded-3xl"
              />
            </Link>
            <Link href={"/"}>
              <Image
                src={"/images/neshan.jpg"}
                placeholder="blur"
                blurDataURL={"/images/neshan.jpg"}
                width={100}
                height={100}
                alt="ساماندهی"
                className="size-32 lg:size-40 object-cover rounded-3xl"
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-center text-first font-light  bg-second/60 border-t-1">
        تمامی مطالب سایت برنجسار محفوظ است
      </div>
    </div>
  );
};

export default Footer;
