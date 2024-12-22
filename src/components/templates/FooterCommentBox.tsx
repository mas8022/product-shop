import React, { useState } from "react";
import swal from "sweetalert";
import toast from "react-hot-toast";
import { useSanitizeInput } from "../../../utils/useSanitizeInput";

const FooterCommentBox: React.FC = () => {
  const [comment, setComment] = useState<string>("");

  const SendComment = (): void => {
    if (comment) {
      fetch("/api/siteImprovementComments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.status === 201) {
            swal({
              icon: "success",
              title: "با موفقیت ارسال شد",
              text: result.message,
            });
            setComment("");
          } else if (result.status === 401) {
            swal({
              icon: "error",
              title: "ارسال نشد",
              text: result.message,
            });
          } else if (result.status === 500) {
            toast.error(result.message);
          }
        });
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 item-end" id="commentBox">
      <span className="w-full sm:self-end text-[1.4rem] dark:text-[#1e293b]">
        در صورتی که در سایت ما ثبت‌نام کردید با نظر دادن در مورد سایت مارا
        همراهی می‌کنید. ممنون می‌شویم نظر خود را بگویید.
      </span>
      <textarea
        value={comment}
        onChange={(e) => {
          const sanitized = useSanitizeInput(e.target.value);
          setComment(sanitized || "");
        }}
        placeholder="نظر خود بنویسید..."
        className="w-full h-20 max-h-64 p-4 rounded-md text-[1.28rem] text-black/70 sm:self-end bg-first/50 placeholder:text-black/50 outline-none focus:outline-none"
      />
      <button
        onClick={SendComment}
        className="w-full h-14 rounded-xl bg-emerald-700/90 shadow-lg active:scale-[99%] text-first text-[1.2rem] sm:text-[1.4rem] font-light sm:self-end active:bg-emerald-700/70"
      >
        ارسال نظر
      </button>
    </div>
  );
};

export default FooterCommentBox;
