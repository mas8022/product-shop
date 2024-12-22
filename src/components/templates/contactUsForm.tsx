"use client";
import { useFormik, FormikErrors } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSanitizeInput } from "../../../utils/useSanitizeInput";

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactUsForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const formik = useFormik<FormValues>({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
    },
    validate: (values) => {
      const errors: FormikErrors<FormValues> = {};
      if (!values?.fullName?.trim() || !isNaN(Number(values?.fullName))) {
        errors.fullName = "نام تان را به درستی وارد کنید";
      }
      if (!emailRegex.test(values.email)) {
        errors.email = "ایمیل تان را به درستی وارد کنید";
      }
      if (isNaN(Number(values.phone))) {
        errors.phone = "شماره موبایل تان را به درستی وارد کنید";
      }
      if (values.message?.trim().length < 10) {
        errors.message =
          "لطفا پیام خود را وارد کنید و حداقل ده کاراکتر داشته باشد ";
      }
      return errors;
    },
    onSubmit: (values, { setSubmitting }) => {
      setLoading(true);
      const formData = new FormData();

      formData.append("fullName", values.fullName);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("message", values.message);

      setTimeout(async () => {
        await fetch(`/api/contactUs`, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.status === 200) {
              toast.success(result.message);
              router.refresh();
            } else {
              toast.error(result.message);
            }
            setLoading(false);
          });
        values.fullName = "";
        values.email = "";
        values.phone = "";
        values.message = ""; // ریست کردن فیلد پیام
        setSubmitting(false);
      }, 3000);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      data-aos="fade-right"
      data-aos-duration="1000"
      className="w-full sm:w-[50rem] p-14 sm:p-28 shadow-lg flex flex-col items-center gap-5 rounded-3xl bg-second/20"
    >
      <p className="text-4xl font-bold text-black/60 mb-8">
        سوال مد نظرتان را بپرسید
      </p>
      <input
        type="text"
        name="fullName"
        placeholder="نام و نام خانوادگی"
        className="w-full input"
        onChange={(e) => {
          const sanitizedValue = useSanitizeInput(e.target.value);
          formik.setFieldValue("fullName", sanitizedValue);
        }}
        onBlur={formik.handleBlur}
        value={formik.values.fullName}
      />
      {formik.errors.fullName && formik.touched.fullName && (
        <div className="text-red-500">{formik.errors.fullName}</div>
      )}
      <input
        type="text"
        name="phone"
        placeholder="شماره تماس"
        className="w-full input"
        onChange={(e) => {
          const sanitizedValue = useSanitizeInput(e.target.value);
          formik.setFieldValue("phone", sanitizedValue);
        }}
        onBlur={formik.handleBlur}
        value={formik.values.phone}
      />
      {formik.errors.phone && formik.touched.phone && (
        <div className="text-red-500">{formik.errors.phone}</div>
      )}
      <input
        type="email"
        name="email"
        placeholder="ایمیل"
        className="w-full input"
        onChange={(e) => {
          const sanitizedValue = useSanitizeInput(e.target.value);
          formik.setFieldValue("email", sanitizedValue);
        }}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.errors.email && formik.touched.email && (
        <div className="text-red-500">{formik.errors.email}</div>
      )}
      <textarea
        name="message"
        placeholder="سوالتان را بفرمایید..."
        onChange={(e) => {
          const sanitizedValue = useSanitizeInput(e.target.value);
          formik.setFieldValue("message", sanitizedValue);
        }}
        onBlur={formik.handleBlur}
        value={formik.values.message}
        className="w-full min-h-40 input pt-3"
      ></textarea>
      {formik.errors.message && formik.touched.message && (
        <div className="text-red-500">{formik.errors.message}</div>
      )}
      <button
        type="submit"
        disabled={loading}
        className={`btn bg-second text-white ${loading ? "opacity-50" : ""}`}
      >
        {loading ? "در حال ارسال..." : "ارسال"}
      </button>
    </form>
  );
};

export default ContactUsForm;
