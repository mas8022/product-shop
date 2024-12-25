import { ObjectId } from "mongoose";
import Link from "next/link";
import React from "react";

const OrderBox = ({
  data,
}: {
  data: { _id: string | ObjectId; name: string; createdAt: string };
}) => {
  console.log("data: ", data);
  
  const maxTimeSendProduct = 4;
  const createdAtDate = new Date(data.createdAt);
  const currentDate = new Date();
  const differenceInMs = currentDate.getTime() - createdAtDate.getTime();
  const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
  let time = maxTimeSendProduct - differenceInDays;

  return (
    <div className="w-full center">
      <div className="xm:w-[40rem] bg-second rounded-3xl shadow-lg flex flex-col items-center gap-8 justify-between p-14">
        <span className="xm:text-5xl text-4xl font-bold text-first">
          {data.name}
        </span>
        <div className="xm:size-[15rem] size-[11rem] center xm:text-[15rem] text-[10rem] font-bold text-first bg-black/20 rounded-full">
          {time}
        </div>
        <span className="text-5xl text-first font-bold">روز</span>
        <span className="xm:text-4xl text-3xl font-light text-black/60">
          مانده تا رسیدن برنج به دست شما
        </span>
        <Link
          href={"/orders#commentBox"}
          className="btn bg-emerald-800/90 text-first text-3xl font-light"
        >
          ارسال نظر در مورد سایت
        </Link>
      </div>
    </div>
  );
};

export default OrderBox;
