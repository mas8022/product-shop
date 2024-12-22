"use client";
import React from "react";
import toast from "react-hot-toast";
import swal from "sweetalert";
import { Address } from "../../../types";
import useElapsedTime from "../../../utils/useElapsedTime";

const CmsOrderCart = ({ data }: { data: Address }) => {
  const {
    _id,
    user,
    province,
    city,
    postalCode,
    fullAddress,
    name,
    createdAt,
  } = data;


  const elapsedTime = useElapsedTime(createdAt);

  const confirmOrder = async () => {
    swal({
      icon: "warning",
      title: "تایید سفارش",
      text: "ایا از تایید سفارش مشتری مطمعن هستیده؟",
      buttons: ["خیر", "بله"],
    }).then((res) => {
      if (res) {
        fetch(`/api/cms/orders/${_id}`, { method: "PUT" })
          .then((res) => res.json())
          .then((result) => {
            if (result.status === 200) {
              toast.success(result.message);
            } else {
              toast.error(result.message);
            }
          });
      }
    });
  };

  return (
    <div className="w-[30rem] p-6 flex flex-col items-center justify-between gap-8 rounded-lg bg-second">
      <div className="w-full rounded-lg bg-black/30 p-4 flex flex-col gap-6">
        <div className="w-full flex justify-between gap-4 child:text-2xl child:font-light child:text-first">
          <span>نام محصول:</span>
          <span className="w-1/2 text-left">{name}</span>
        </div>
        <div className="w-full flex justify-between gap-4 child:text-2xl child:font-light child:text-first">
          <span>نام و نام خانوادگی:</span>
          <span className="w-1/2 text-left">{user?.fullName}</span>
        </div>
        <div className="w-full flex justify-between gap-4 child:text-2xl child:font-light child:text-first">
          <span>شماره موبایل:</span>
          <span>{user?.phone}</span>
        </div>
        <div className="w-full flex justify-between gap-4 child:text-2xl child:font-light child:text-first">
          <span>استان:</span>
          <span>{province}</span>
        </div>
        <div className="w-full flex justify-between gap-4 child:text-2xl child:font-light child:text-first">
          <span>شهر:</span>
          <span>{city}</span>
        </div>
        <div className="w-full flex justify-between gap-4 child:text-2xl child:font-light child:text-first">
          <span>کد پستی:</span>
          <span>{postalCode}</span>
        </div>
        <div className="w-full flex justify-between gap-4 child:text-2xl child:font-light child:text-first">
          <span>ادرس:</span>
          <span>{fullAddress}</span>
        </div>
        <div className="w-full flex justify-between gap-4 child:text-2xl child:font-light child:text-first">
          <span>زمان سفارش:</span>
          <span>{elapsedTime}</span>
        </div>
      </div>
      <button
        onClick={confirmOrder}
        className="btn w-full text-3xl text-first bg-green-600"
      >
        تایید
      </button>
    </div>
  );
};

export default CmsOrderCart;
