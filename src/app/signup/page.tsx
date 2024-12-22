"use client";
import { useFormik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MoonLoader } from "react-spinners";
import { useSanitizeInput } from "../../../utils/useSanitizeInput";

const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

interface FormValues {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  check: boolean;
}

const Page: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const signUp = useFormik<FormValues>({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      phone: "",
      check: false,
    },
    validate: (values) => {
      const errors: { [key: string]: string } = {};
      if (!values.fullName.trim() || !isNaN(Number(values.fullName))) {
        errors.fullName = "نام تان را به درستی وارد کنید";
      } else if (!emailRegex.test(values.email)) {
        errors.email = "ایمیل تان را به درستی وارد کنید";
      } else if (values.password.length > 15 || values.password.length < 8) {
        errors.password = "رمز عبور شما باید بین 8 تا 15 کاراکتر داشته باشد";
      } else if (isNaN(Number(values.phone)) || !values.phone.trim()) {
        errors.phone = "شماره موبایل تان را به درستی وارد کنید";
      } else if (!values.check) {
        errors.check =
          "پس از خواندن قوانین سایت در صورت قبول قوانین تیک را بزنید";
      }
      return errors;
    },
    onSubmit: (values, { setSubmitting }) => {
      setLoading(true);
      setTimeout(async () => {
        await fetch("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((res) => {
            return res.json();
          })
          .then((result) => {
            if (result.status === 201) {
              toast.success(result.message);
              location.pathname = "/";
            } else {
              toast.error(result.message);
            }
          });
        setLoading(false);

        setSubmitting(false);
      }, 3000);
    },
  });

  return (
    <div className="w-full h-screen center lgg:p-0 py-32 !pb-36 px-7">
      <form
        className="w-[40rem] bg-second/20 rounded-3xl flex flex-col gap-7 p-8 sm:p-[3rem] md:sm:p-[5rem] py-[4rem] items-center justify-center"
        onSubmit={signUp.handleSubmit}
      >
        <input
          className="w-full h-14 rounded-lg bg-white px-[1.5rem] text-[1.3rem] text-black/70"
          id="fullName"
          name="fullName"
          type="text"
          onChange={(e) => {
            const sanitizedValue = useSanitizeInput(e.target.value);
            signUp.setFieldValue("fullName", sanitizedValue);
          }}
          value={signUp.values.fullName}
          placeholder="نام و نام خانوادگی"
        />
        {signUp.touched.fullName && signUp.errors.fullName && (
          <span className="text-xl text-red-600">{signUp.errors.fullName}</span>
        )}
        <input
          className="w-full h-14 rounded-lg bg-white px-[1.5rem] text-[1.3rem] text-black/70"
          id="email"
          name="email"
          type="text"
          onChange={(e) => {
            const sanitizedValue = useSanitizeInput(e.target.value);
            signUp.setFieldValue("email", sanitizedValue);
          }}
          value={signUp.values.email}
          placeholder="ایمیل"
        />
        {signUp.touched.email && signUp.errors.email && (
          <span className="text-xl text-red-600">{signUp.errors.email}</span>
        )}
        <input
          className="w-full h-14 rounded-lg bg-white px-[1.5rem] text-[1.3rem] text-black/70"
          id="phone"
          name="phone"
          type="text"
          onChange={(e) => {
            const sanitizedValue = useSanitizeInput(e.target.value);
            signUp.setFieldValue("phone", sanitizedValue);
          }}
          value={signUp.values.phone}
          placeholder="شماره موبایل"
        />
        {signUp.touched.phone && signUp.errors.phone && (
          <span className="text-xl text-red-600">{signUp.errors.phone}</span>
        )}
        <input
          className="w-full h-14 rounded-lg bg-white px-[1.5rem] text-[1.3rem] text-black/70"
          id="password"
          name="password"
          type="text"
          onChange={(e) => {
            const sanitizedValue = useSanitizeInput(e.target.value);
            signUp.setFieldValue("password", sanitizedValue);
          }}
          value={signUp.values.password}
          placeholder="رمز عبور"
        />
        {signUp.touched.password && signUp.errors.password && (
          <span className="text-xl text-red-600">{signUp.errors.password}</span>
        )}

        <div className="w-full h-[2rem] px-[0.5rem] flex items-center gap-4">
          <p className="text-[1.2rem] text-black/30">
            آیا موافق با{" "}
            <Link
              href={"/rule"}
              className="text-blue-600/60 font-bold text-[1.4rem]"
            >
              قوانین
            </Link>{" "}
            این سایت هستید
          </p>
          <input
            type="checkbox"
            name="check"
            onChange={signUp.handleChange}
            onBlur={signUp.handleBlur}
            checked={signUp.values.check}
            className="size-[1.5rem]"
          />
        </div>
        {signUp.touched.check && signUp.errors.check && (
          <span className="text-xl text-red-600">{signUp.errors.check}</span>
        )}
        <button
          type="submit"
          className="w-full rounded-lg border-0 h-20 bg-second text-[1.8rem] active:bg-second/50 text-first flex items-center justify-center"
        >
          {loading ? (
            <MoonLoader size={20} color="#fff" />
          ) : (
            <span>ثبت نام</span>
          )}
        </button>
        <p className="text-[1.4rem] text-black/30">
          در صورت داشتن حساب کاربری{" "}
          <Link href={"/login"} className="text-blue-700/60">
            وارد
          </Link>{" "}
          شوید
        </p>
      </form>
    </div>
  );
};

export default Page;
