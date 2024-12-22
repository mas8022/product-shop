"use client";
import React, { useState } from "react";
import RequestOtpForm from "@/components/templates/RequestOtpForm";
import VerifyOtpForm from "../../components/templates/VerifyOtpForm";

export default function Login() {
  const [isSendCode, setIsSendCode] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");

  return (
    <div className="w-full h-screen center lgg:p-0 py-32 !pb-36 px-7">
      {isSendCode ? (
        <VerifyOtpForm phone={phone} />
      ) : (
        <RequestOtpForm
          setIsSendCode={setIsSendCode}
          phone={phone}
          setPhone={setPhone}
        />
      )}
    </div>
  );
}
