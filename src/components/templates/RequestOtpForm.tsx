import React, { useState } from "react";
import { useSanitizeInput } from "../../../utils/useSanitizeInput";
import toast from "react-hot-toast";
import MoonLoader from "react-spinners/MoonLoader";
import Link from "next/link";

interface RequestOtpFormProps {
  setIsSendCode: React.Dispatch<React.SetStateAction<boolean>>;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
}

const RequestOtpForm: React.FC<RequestOtpFormProps> = ({
  setIsSendCode,
  phone,
  setPhone,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<boolean>(false);

  const iranianPhoneRegex = /^(\+98|0)?9\d{9}$/;

  const requestOtp = async () => {
    if (!iranianPhoneRegex.test(phone)) {
      setPhoneError(true);
      return;
    } else {
      setPhoneError(false);
    }

    setLoading(true);

    try {
      const response = await fetch("/api/sms/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });

      const result = await response.json();

      if (result.status === 201) {
        toast.success(result.message);
        setIsSendCode(true);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-[40rem] bg-second/20 rounded-3xl flex flex-col gap-7 p-[2rem] sm:p-[3rem] md:sm:p-[5rem] py-[4rem] items-center justify-center">
      <input
        className="w-full h-14 rounded-lg border-0 px-[1.5rem] text-[1.3rem] bg-white text-black/70"
        name="phone"
        type="text"
        onChange={(e) => setPhone(useSanitizeInput(e.target.value))}
        value={phone}
        placeholder="شماره موبایل"
      />
      {phoneError && (
        <span className="text-xl text-red-600">
          شماره موبایل تان را به درستی وارد کنید
        </span>
      )}

      <div
        onClick={requestOtp}
        className="w-full rounded-lg border-0 h-[4.5rem] text-3xl bg-second active:bg-second/70 text-white flex items-center justify-center cursor-pointer"
      >
        {loading ? (
          <MoonLoader size={20} color="#fff" />
        ) : (
          <span>ارسال کد</span>
        )}
      </div>
      <p className="text-[1.4rem] text-black/30">
        در صورت نداشتن حساب کاربری{" "}
        <Link href={"/signup"} className="text-blue-700/60">
          ثبت نام
        </Link>{" "}
        کنید
      </p>
    </form>
  );
};

export default RequestOtpForm;
