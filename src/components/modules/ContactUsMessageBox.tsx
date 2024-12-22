"use client";

import React, { memo } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface CommentData {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

interface ContactUsMessageBox {
  commentData: CommentData;
}

const ContactUsMessageBox: React.FC<ContactUsMessageBox> = memo(
  ({ commentData }) => {
    const router = useRouter();
    const { _id, fullName, email, phone, message } = commentData;

    const deleteComment = async (id: string): Promise<void> => {
      const response = await swal({
        icon: "warning",
        title: "هشدار",
        text: "ایا از حذف نظر مطمعنین؟",
        buttons: ["لغو", "تایید"],
      });

      if (response) {
        fetch(`/api/cms/contactMessage/${id}/delete`, {
          method: "DELETE",
        })
          .then((res) =>
            res.json().then((result) => {
              if (result.status === 200) {
                toast.success(result.message);
              } else {
                toast.error(result.message);
              }
            })
          )
          .catch((error) => {
            toast.error("مشکلی رخ داده است");
          });
      }

      router.refresh();
    };

    return (
      <div className="w-[32rem] py-10 bg-second flex flex-col items-center shadow-md rounded-xl">
        <p className="text-[15px] font-bold mb-12 dark:text-first">
          {fullName}
        </p>

        <div className="w-full flex flex-col items-center gap-12 px-8">
          <p className="text-[1.3rem] font-light line-clamp-1 self-center text-first">
            {phone}
          </p>
          <p className="text-[1.3rem] font-light line-clamp-1 self-center text-first">
            {email}
          </p>
          <p className="text-[1.4rem] text-first p-6 rounded-lg bg-black/5 dark:bg-black/20">
            {message}
          </p>
          <div className="w-full flex items-center justify-between gap-2 child:shadow-sm">
            <div
              onClick={() => deleteComment(_id)}
              className="w-full h-14 flex items-center justify-center text-first text-[1.5rem] font-light border-1 bg-emerald-600 active:bg-first active:border-second active:text-second rounded-lg cursor-pointer"
            >
              پاک کردن
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default ContactUsMessageBox;
