"use client";
import React, { useState } from "react";
import { useFormik, FormikErrors } from "formik";
import { MoonLoader } from "react-spinners";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSanitizeInput } from "@/../utils/useSanitizeInput";

const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

interface LoginValues {
  email: string;
  password: string;
}

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);

  const sanitizeInput = useSanitizeInput;

  const login = useFormik<LoginValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors: FormikErrors<LoginValues> = {};
      if (!emailRegex.test(values.email)) {
        errors.email = "ایمیل تان را به درستی وارد کنید";
      } else if (values.password.length > 15 || values.password.length < 8) {
        errors.password = "رمز عبور شما باید بین 8 تا 15 کاراکتر داشته باشد";
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      setTimeout(async () => {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const result = await response.json();

        setLoading(false);

        if (result.status === 200) {
          toast.success(result.message);
          location.pathname = "/";
        } else {
          toast.error(result.message);
        }

        setSubmitting(false);
      }, 3000);
    },
  });

  return (
    <div className="w-full h-screen center lgg:p-0 py-32 !pb-36 px-7">
      <form
        className="w-[40rem] bg-second/20 rounded-3xl flex flex-col gap-7 p-[2rem] sm:p-[3rem] md:sm:p-[5rem] py-[4rem] items-center justify-center"
        onSubmit={login.handleSubmit}
      >
        <input
          className="w-full h-14 rounded-lg border-0 px-[1.5rem] text-[1.3rem] bg-white text-black/70"
          id="email"
          name="email"
          type="text"
          onChange={(e) => {
            const sanitizedValue = sanitizeInput(e.target.value);
            login.setFieldValue("email", sanitizedValue);
          }}
          value={login.values.email}
          placeholder="ایمیل"
        />
        {login.touched.email && login.errors.email && (
          <span className="text-xl text-red-600">{login.errors.email}</span>
        )}

        <input
          className="w-full h-14 rounded-lg border-0 px-[1.5rem] text-[1.3rem] bg-white text-black/70"
          id="password"
          name="password"
          type="password"
          onChange={(e) => {
            const sanitizedValue = sanitizeInput(e.target.value);
            login.setFieldValue("password", sanitizedValue);
          }}
          value={login.values.password}
          placeholder="رمز عبور"
        />
        {login.touched.password && login.errors.password && (
          <span className="text-xl text-red-600">{login.errors.password}</span>
        )}
        <button
          type="submit"
          className="w-full rounded-lg border-0 h-[4.5rem] text-3xl bg-second active:bg-second/70 text-white flex items-center justify-center"
        >
          {loading ? <MoonLoader size={20} color="#fff" /> : <span>ورود</span>}
        </button>
        <Link
          href={"/restorePass"}
          className="w-full h-12 rounded-lg border-0 text-2xl bg-second/70 active:bg-second/50 text-white flex items-center justify-center"
        >
          بازیابی رمز عبور
        </Link>
        <p className="text-[1.4rem] text-black/30">
          در صورت نداشتن حساب کاربری{" "}
          <Link href={"/signup"} className="text-blue-700/60">
            ثبت نام
          </Link>{" "}
          کنید
        </p>
      </form>
    </div>
  );
}
