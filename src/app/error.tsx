"use client";

import React from "react";
import Link from "next/link";

const GlobalError = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="w-full h-screen center px-6">
      <div className="text-center bg-white shadow-lg rounded-3xl p-8 border border-84B8AC bg-second/10">
        <h1 className="text-5xl font-bold text-84B8AC">
          😔 مشکلی پیش آمده است!
        </h1>
        <p className="my-10 text-3xl text-gray-600">
          متأسفیم، مشکلی رخ داده است. لطفاً دوباره تلاش کنید یا با ما تماس
          بگیرید.
        </p>

        <div className="mt-8 flex flex-col gap-4">
          <button
            onClick={reset}
            className="btn w-full text-3xl bg-third text-black/60"
          >
            تلاش مجدد
          </button>

          <Link href="/" className="btn w-full text-3xl bg-second text-first">
            بازگشت به صفحه اصلی
          </Link>
        </div>
        <div className="w-full mt-8 flex flex-col items-center gap-4">
          <p className="text-2xl text-gray-400">
            اگر مشکل حل نشد، لطفاً با پشتیبانی برنجسار تماس بگیرید.
          </p>
          <a href="tel:02112345678" className="text-2xl text-84B8AC underline">
            شماره تماس: 09113185137
          </a>
        </div>
      </div>
    </div>
  );
};

export default GlobalError;
