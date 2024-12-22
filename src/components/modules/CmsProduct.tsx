"use client";
import React from "react";
import { product } from "../../../types";
import Image from "next/image";
import { useModal } from "../../../utils/useModal";
import Uploader from "../../../utils/uploader";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

interface CmsProductProps {
  data: product;
}

interface FormValues {
  name: string;
  file: File | string;
  price: string;
  count: string;
}

const CmsProduct: React.FC<CmsProductProps> = ({ data }) => {
  const { _id, name, price, count, image } = data;

  const { openModal, closeModal, Modal } = useModal();

  const initialValues: FormValues = {
    name,
    file: "",
    price: price.toString(),
    count: count.toString(),
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("نام محصول الزامی است")
      .notOneOf([String(Number)], "نام محصول نمی‌تواند شامل فقط اعداد باشد"),
    price: Yup.number()
      .typeError("قیمت محصول باید یک عدد باشد")
      .required("قیمت محصول الزامی است"),
    count: Yup.number()
      .typeError("تعداد محصول باید یک عدد باشد")
      .required("تعداد محصول الزامی است"),
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("file", values.file);
    formData.append("price", values.price);
    formData.append("count", values.count);

    await fetch(`/api/cms/products/${_id}`, {
      method: "PUT",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          toast.success(result.message)
        }else{
          toast.success(result.message)
        }
      });

    setTimeout(() => {
      setSubmitting(false);
    }, 3000);
  };

  return (
    <>
      <Modal>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="xm:w-[40rem] w-[30rem] rounded-lg shadow-md bg-second p-16 flex flex-col items-center gap-8">
              <Uploader
                formHandler={{
                  setFieldValue,
                }}
                label="عکس محصول را بارگذاری کنید"
                name="file"
                customClassName="w-full h-20 center bg-emerald-600 xm:text-3xl text-2xl text-first font-light rounded-lg cursor-pointer active:scale-95"
              />

              <div className="w-full flex flex-col items-center gap-2">
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="input w-full"
                  placeholder="نام محصول"
                />
                <ErrorMessage
                  name="name"
                  component="span"
                  className="text-xl text-red-600"
                />
              </div>

              <div className="w-full flex flex-col items-center gap-2">
                <Field
                  type="text"
                  id="price"
                  name="price"
                  className="input w-full"
                  placeholder="قیمت محصول"
                />
                <ErrorMessage
                  name="price"
                  component="span"
                  className="text-xl text-red-600"
                />
              </div>

              <div className="w-full flex flex-col items-center gap-2">
                <Field
                  type="text"
                  id="count"
                  name="count"
                  className="input w-full"
                  placeholder="تعداد محصول"
                />
                <ErrorMessage
                  name="count"
                  component="span"
                  className="text-xl text-red-600"
                />
              </div>

              <div className="w-full flex items-center justify-between gap-4">
                <div
                  onClick={closeModal}
                  className="btn w-full center text-first bg-rose-500 text-3xl font-light"
                >
                  لغو
                </div>
                <button
                  type="submit"
                  className="btn w-full center text-first bg-green-500 text-3xl font-light"
                >
                  ویرایش
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>

      <div className="w-[25rem] p-8 rounded-xl shadow-md bg-second flex flex-col items-center gap-8">
        <p className="text-3xl font-bold text-first">{name}</p>
        <Image
          src={image}
          width={300}
          height={450}
          alt="عکس محصول"
          className="rounded-lg"
        />
        <div className="w-full flex justify-between items-end text-first text-2xl">
          <span>قیمت محصول:</span>
          <p className="font-light text-3xl text-first">
            {price.toLocaleString("fa-IR")}
            <span className="opacity-0">.</span>ریال
          </p>
        </div>
        <div className="w-full flex justify-between items-end text-first text-2xl">
          <span>تعداد محصول:</span>
          <p className="font-light text-3xl text-first">
            {count.toLocaleString("fa-IR")}
          </p>
        </div>
        <div
          onClick={openModal}
          className="btn w-full bg-emerald-700 center text-first"
        >
          ویرایش محصول
        </div>
      </div>
    </>
  );
};

export default CmsProduct;
