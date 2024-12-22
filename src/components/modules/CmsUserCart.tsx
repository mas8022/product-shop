import { useRouter } from "next/navigation";
import React, { memo } from "react";
import toast from "react-hot-toast";
import swal from "sweetalert";
import { User } from "../../../types";
import { ObjectId } from "mongoose";

const CmsUserCart = memo(({ data }: { data: User }) => {
  const router = useRouter();
  const { _id, fullName, email } = data;

  const blockUser = (id: string | ObjectId) => {
    swal({
      icon: "warning",
      title: "هشدار...",
      text: "ایا از بلاک کاربر مطمعنین؟",
      buttons: ["لغو", "تایید"],
    }).then((response) => {
      if (response) {
        fetch(`/api/cms/users/${id}`, { method: "PUT" })
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
    <div className="w-[32rem] py-10 bg-second flex flex-col items-center shadow-md rounded-lg">
      <p className="text-[15px] font-bold mb-12 dark:text-first">{fullName}</p>

      <div className="w-full flex flex-col items-center gap-12 px-8">
        <p className="text-[1.4rem] font-light text-first line-clamp-1 self-center">
          {email}
        </p>
        <div
          onClick={() => blockUser(_id)}
          className="w-full h-14 flex items-center justify-center text-first text-[1.5rem] font-light border-1 bg-emerald-600 active:bg-first active:border-second active:text-second rounded-lg cursor-pointer"
        >
          مسدود
        </div>
      </div>
    </div>
  );
});
export default CmsUserCart;
