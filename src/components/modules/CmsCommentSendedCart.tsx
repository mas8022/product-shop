"use client";
import { useRouter } from "next/navigation";
import React, { memo } from "react";
import toast from "react-hot-toast";
import swal from "sweetalert";
import { siteImprovementCommentType } from "../../../types.js";
import { ObjectId } from "mongoose";

const CmsCommentSendedCart = memo(
  ({ data }: { data: siteImprovementCommentType }) => {
    const router = useRouter();
    const { _id, comment, user } = data;

    const confirmComment = (id: string | ObjectId) => {
      swal({
        icon: "warning",
        title: "هشدار...",
        text: "ایا از تایید نظر مطمعنین؟",
        buttons: ["لغو", "تایید"],
      }).then((response) => {
        if (response) {
          fetch(`/api/cms/siteImprovementsComment/${id}`, { method: "PUT" })
            .then((res) => res.json())
            .then((result) => {
              if (result.status === 200) {
                toast.success(result.message);
              } else {
                toast.error(result.message);
              }
              router.refresh();
            });
        }
      });
    };

    const deleteComment = (id: string | ObjectId) => {
      swal({
        icon: "warning",
        title: "هشدار...",
        text: "ایا از حذف نظر مطمعنین؟",
        buttons: ["لغو", "تایید"],
      }).then((response) => {
        if (response) {
          fetch(`/api/cms/siteImprovementsComment/${id}`, { method: "DELETE" })
            .then((res) => res.json())
            .then((result) => {
              if (result.status === 200) {
                toast.success(result.message);
              } else {
                toast.error(result.message);
              }
              router.refresh();
            });
        }
      });
    };

    return (
      <div className="w-[32rem] p-8 bg-second flex flex-col items-center justify-between gap-4 shadow-md rounded-lg">
        <div className="w-full flex flex-col items-center gap-6 px-8">
          {user?.fullName && (
            <p className="text-2xl font-bold dark:text-first">
              {user?.fullName}
            </p>
          )}
          {user?.email && (
            <p className="text-[1.3rem] font-light text-black/60 line-clamp-1 self-center dark:text-first/80">
              {user?.email}
            </p>
          )}
          <p className="w-full text-[1.4rem] dark:text-first p-6 rounded-lg bg-black/5 dark:bg-black/20 text-center">
            {comment}
          </p>
        </div>
        <div className="w-full flex items-center justify-between gap-2 child:shadow-sm">
          <div
            onClick={() => deleteComment(_id)}
            className="w-full h-14 flex items-center cursor-pointer justify-center text-first text-[1.5rem] font-light border-1 bg-rose-500 active:bg-first active:border-second active:text-second rounded-lg"
          >
            پاک کردن
          </div>
          <div
            onClick={() => confirmComment(_id)}
            className="w-full h-14 flex items-center cursor-pointer justify-center text-first text-[1.5rem] font-light border-1 bg-green-500 active:bg-first active:border-second active:text-second rounded-lg"
          >
            تایید
          </div>
        </div>
      </div>
    );
  }
);
export default CmsCommentSendedCart;
