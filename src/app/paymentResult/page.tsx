"use client";

import React from "react";

import { useSearchParams } from "next/navigation";
import CheckIcon from "../../components/svgs/checkout";
import CloseIcon from "../../components/svgs/close";
import Link from "next/link";
import Aos from "../../../utils/Aos";

const Page = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const receipt = searchParams.get("receipt") || false;

  return (
    <div className="w-full h-screen center bg-second px-6">
      <Aos />
      <div
        data-aos="zoom-in"
        data-aos-duration="300"
        className="w-[70rem] rounded-xl shadow-2xl center gap-8 bg-first xm:p-12 p-4"
      >
        <div
          className="w-full h-full xm:p-12 p-4 shadow-md bg-second rounded-xl"
          data-aos="zoom-in"
          data-aos-duration="500"
        >
          {status === "201" ? (
            <div
              className="w-full h-full xm:p-12 p-4 shadow-md rounded-xl bg-first center flex-col gap-10"
              data-aos="zoom-in"
              data-aos-duration="700"
            >
              <CheckIcon />
              <p className="text-5xl text-center">پرداخت با موفقیت انجام شد</p>
              <p className="text-3xl text-black/60 font-light text-center">
                کد پیگیری تراکنش: {receipt}
              </p>
              <Link
                href={"/orders"}
                className="btn bg-second text-first text-2xl text-center"
              >
                رفتن به صفحه سفارشات
              </Link>
            </div>
          ) : (
            <div
              className="w-full h-full xm:p-12 p-4 shadow-md rounded-xl bg-first center flex-col gap-8"
              data-aos="zoom-in"
              data-aos-duration="700"
            >
              <CloseIcon />
              <p className="text-5xl text-center">پرداخت ناموفق بود</p>
              <Link href={"/"} className="btn bg-second text-first text-2xl">
                محصولات
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
