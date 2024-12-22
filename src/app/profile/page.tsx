"use client";
import { useFormik, FormikErrors } from "formik";
import React, { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import toast from "react-hot-toast";
import { logoutHandler } from "../../../utils/authTools";
import { useSanitizeInput } from "../../../utils/useSanitizeInput";
import Aos from "../../../utils/Aos";

const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

interface ProfileFormValues {
  fullName: string;
  email: string;
  phone: string;
}

interface ProfileResponse {
  fullName: string;
  email: string;
  phone: string;
}

const Page: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const editProfile = useFormik<ProfileFormValues>({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
    },
    validate: (values) => {
      const errors: FormikErrors<ProfileFormValues> = {};
      if (!values.fullName.trim() || !isNaN(Number(values.fullName))) {
        errors.fullName = "نام تان را به درستی وارد کنید";
      }
      if (!emailRegex.test(values.email)) {
        errors.email = "ایمیل تان را به درستی وارد کنید";
      }
      if (isNaN(Number(values.phone))) {
        errors.phone = "شماره موبایل تان را به درستی وارد کنید";
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);

      try {
        const formData = new FormData();
        formData.append("fullName", values.fullName);
        formData.append("email", values.email);
        formData.append("phone", values.phone);

        const response = await fetch(`/api/editProfile`, {
          method: "POST",
          body: formData,
        });
        const result = await response.json();

        if (result.status === 200) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("خطایی رخ داد، لطفاً دوباره تلاش کنید");
      } finally {
        setLoading(false);
        setSubmitting(false);
        fetchProfileData();
      }
    },
  });

  const fetchProfileData = async () => {
    try {
      const response = await fetch(`/api/me`);
      const result: ProfileResponse = await response.json();
      if (result) {
        editProfile.setFieldValue("fullName", result.fullName);
        editProfile.setFieldValue("email", result.email);
        editProfile.setFieldValue("phone", result.phone);
      }
    } catch (error) {
      toast.error("خطا در دریافت اطلاعات");
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <div className="w-full h-screen center px-6">
      <Aos />
      <div
        data-aos="fade-up"
        data-aos-duration="500"
        className="sm:w-[50rem] w-[40rem] bg-second/30 rounded-2xl flex flex-col gap-8 items-center sm:p-32 xxm:p-20 p-14 shadow-md"
      >
        <form
          onSubmit={editProfile.handleSubmit}
          className="w-full flex flex-col items-center gap-7 bg-black/0 child:text-[1.4rem] child:text-black/60 dark:child:text-first/80 child:outline-none child:focus:outline-none"
        >
          <input
            className="input w-full !text-black/70 font-thinFont"
            id="fullName"
            name="fullName"
            type="text"
            onChange={(e) => {
              const sanitizedValue = useSanitizeInput(e.target.value);
              editProfile.setFieldValue("fullName", sanitizedValue);
            }}
            value={editProfile.values.fullName}
            placeholder="نام و نام خانوادگی"
          />
          {editProfile.touched.fullName && editProfile.errors.fullName && (
            <span className="!text-red-500">{editProfile.errors.fullName}</span>
          )}
          <input
            className="input w-full !text-black/70 font-thinFont"
            id="email"
            name="email"
            type="text"
            onChange={(e) => {
              const sanitizedValue = useSanitizeInput(e.target.value);
              editProfile.setFieldValue("email", sanitizedValue);
            }}
            value={editProfile.values.email}
            placeholder="ایمیل"
          />
          {editProfile.touched.email && editProfile.errors.email && (
            <span className="!text-red-500">{editProfile.errors.email}</span>
          )}
          <input
            className="input w-full !text-black/70 font-thinFont"
            id="phone"
            name="phone"
            type="text"
            onChange={(e) => {
              const sanitizedValue = useSanitizeInput(e.target.value);
              editProfile.setFieldValue("phone", sanitizedValue);
            }}
            value={editProfile.values.phone}
            placeholder="شماره موبایل"
          />
          {editProfile.touched.phone && editProfile.errors.phone && (
            <span className="!text-red-500">{editProfile.errors.phone}</span>
          )}
          <button
            type="submit"
            className="w-full rounded-lg border-0 h-[4.5rem] font-light bg-emerald-900/70 !text-[1.8rem] active:bg-second/50 !text-first flex items-center justify-center"
          >
            {loading ? (
              <MoonLoader size={20} color="#fff" />
            ) : (
              <span>ویرایش اطلاعات</span>
            )}
          </button>
        </form>
        <button
          onClick={logoutHandler}
          className="w-full rounded-lg border-0 h-[4.5rem] bg-red-500 font-light text-[1.8rem] active:bg-second/50 text-first flex items-center justify-center"
        >
          خروج از حساب
        </button>
      </div>
    </div>
  );
};

export default Page;
