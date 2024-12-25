"use client";
import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { citiesByProvince } from "../../../staticData";
import { MoonLoader } from "react-spinners";
import { ILocation } from "../../../types";
import Title from "../modules/Title";
import Image from "next/image";

type FormValues = {
  province: string;
  city: string;
  postalCode: string;
  fullAddress: string;
};

const BuyForm: React.FC<{
  name: string;
  price: number;
  image: string;
  myLocation: ILocation | null;
}> = ({ name, price, image, myLocation }) => {
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues: FormValues = {
    province: myLocation?.province ? myLocation?.province : "",
    city: myLocation?.city ? myLocation?.city : "",
    postalCode: myLocation?.postalCode ? myLocation?.postalCode : "",
    fullAddress: myLocation?.fullAddress ? myLocation?.fullAddress : "",
  };

  const validationSchema = Yup.object({
    province: Yup.string().required("استان الزامی است"),
    city: Yup.string().required("شهر الزامی است"),
    postalCode: Yup.string()
      .matches(/^\d{10}$/, "کد پستی باید ۱۰ رقم باشد")
      .required("کد پستی الزامی است"),
    fullAddress: Yup.string().required("آدرس کامل الزامی است"),
  });

  const handleProvinceChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const province = e.target.value;
    setFieldValue("province", province);
    setFieldValue("city", "");
    setCities(citiesByProvince[province] || []);
  };

  useEffect(() => {
    if (!!myLocation?.province) {
      setCities(citiesByProvince[myLocation?.province] || []);
    }
  }, [myLocation?.province]);

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    await fetch("/api/checkout/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values, name }),
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.href = data.paymentUrl;
      });
    setLoading(false);
  };

  return (
    <div className="w-full h-auto md:px-40 px-8 sm:pt-56 pt-40 pb-24 flex justify-between gap-24">
      <div className="w-full flex flex-col gap-6">
        <Title title="اطلاعات درخواست سفارش" />
        <p className="xxd:hidden text-center font-bold text-emerald-900/70 text-3xl">
          {name}
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form className="w-full flex flex-col xxd:gap-40 gap-20">
              <div className="w-full flex xxd:flex-row xxd:flex-wrap flex-col xxd:items-start items-center gap-4">
                <div className="flex flex-col">
                  <Field
                    as="select"
                    name="province"
                    className="w-[30rem] h-20 p-4 bg-second/30 rounded-full bg-center text-2xl outline-none focus:outline-none"
                    value={values.province}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleProvinceChange(e, setFieldValue)
                    }
                  >
                    <option value="" disabled>
                      انتخاب استان
                    </option>
                    {Object.keys(citiesByProvince).map((province) => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="province"
                    component="div"
                    className="text-rose-600 text-base pr-10"
                  />
                </div>
                <div className="flex flex-col">
                  <Field
                    as="select"
                    name="city"
                    className="w-[30rem] h-20 p-4 bg-second/30 rounded-full bg-center text-2xl outline-none focus:outline-none"
                    disabled={!values.province}
                    value={values.city}
                  >
                    <option value="" disabled>
                      {values.province
                        ? "انتخاب شهر"
                        : "ابتدا استان را انتخاب کنید"}
                    </option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-rose-600 text-base pr-10"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="w-[30rem] h-20 p-4 bg-second/30 rounded-full bg-center">
                    <Field
                      type="text"
                      name="postalCode"
                      placeholder="کد پستی"
                      className="w-full h-full rounded-full px-4 text-2xl outline-none focus:outline-none bg-transparent"
                    />
                  </div>
                  <ErrorMessage
                    name="postalCode"
                    component="div"
                    className="text-rose-600 text-base pr-10"
                  />
                </div>

                <div className="flex flex-col">
                  <div className="w-[30rem] h-20 p-4 bg-second/30 rounded-full bg-center">
                    <Field
                      type="text"
                      name="fullAddress"
                      placeholder="آدرس کامل (خیابان، پلاک، واحد)"
                      className="w-full h-full rounded-full px-4 text-2xl outline-none focus:outline-none bg-transparent"
                    />
                  </div>
                  <ErrorMessage
                    name="fullAddress"
                    component="div"
                    className="text-rose-600 text-base pr-10"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <p className="xxd:hidden block font-light text-4xl text-emerald-600 self-center">
                  {price.toLocaleString("fa-IR")}
                  <span className="opacity-0">.</span>ریال
                </p>

                <p className="p-4 rounded-lg bg-second/20 text-emerald-700 font-light text-2xl sm:text-start text-center">
                  هزینه ارسال بر عهده کاربر بوده و ارسال به سراسر نقاط ایران
                  امکان‌پذیر است.
                </p>
                <p className="p-4 rounded-lg bg-second/20 text-emerald-700 font-light text-2xl sm:text-start text-center">
                  بعد از خرید اول اطلاعات شما ذخیره میشود و برای دفعه بعد دیگر
                  نیاز به وارد کردن اطلاعات ندارید
                </p>
                <button
                  type="submit"
                  className="w-full h-20 center bg-emerald-700 text-first text-3xl rounded-2xl cursor-pointer active:scale-[99%] active:bg-emerald-700/80 center"
                >
                  {loading ? (
                    <MoonLoader size={20} color="#fff" />
                  ) : (
                    <span>رفتن به درگاه پرداخت</span>
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className="xxd:flex hidden !w-[50rem] p-12 rounded-3xl flex-col items-center justify-between bg-second/20 shadow-md">
        <p className="font-light text-4xl text-emerald-600">{name}</p>
        <Image
          src={image}
          width={400}
          height={500}
          alt={`تصویر ${name}`}
          className="rounded-3xl"
        />

        <p className="font-light text-4xl text-emerald-600">
          {price.toLocaleString("fa-IR")}
          <span className="opacity-0">.</span>ریال
        </p>
      </div>
    </div>
  );
};

export default BuyForm;
