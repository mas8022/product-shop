"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const VerifyOtpForm: React.FC<{ phone: string }> = ({ phone }) => {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", ""]);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = async (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }

      if (newOtp.every((digit) => digit !== "")) {
        try {
          setLoading(true);

          const response = await fetch("/api/sms/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ phone, code: newOtp.join("") }),
          });

          const result = await response.json();

          if (result.status === 200) {
            toast.success(result.message);
            router.replace('/')
          } else {
            toast.error(result.message);
          }
        } catch (error) {
          toast.error("An error occurred. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="w-full h-screen center px-4">
      <div className="bg-second/20 shadow-md rounded-lg sm:p-20 p-7 flex flex-col gap-4">
        <h2 className="sm:text-5xl text-3xl font-semibold text-gray-800 text-center mb-4">
          تأیید کد
        </h2>
        <p className="text-gray-600 sm:text-3xl text-xl text-center mb-6">
          لطفاً کد ۵ رقمی ارسال‌شده به شماره موبایل خود را وارد کنید
        </p>

        <div className="flex justify-center flex-row-reverse gap-2 mb-6">
          {otp.map((_, index) => (
            <input
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              type="text"
              dir="rtl"
              maxLength={1}
              value={otp[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="sm:size-32 size-20 text-center sm:text-7xl text-4xl text-black/60 font-light border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-second"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpForm;
