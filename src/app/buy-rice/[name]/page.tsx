import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import productModel from "../../../../models/product.js";
import { Me } from "../../../../utils/me";
import Title from "@/components/modules/Title";
import BuyForm from "@/components/templates/BuyForm";
import PermissionAlert from "@/components/modules/PermissionAlert";

const page = async ({ params }: { params: { name: string } }) => {
  let { name } = await params;
  name = decodeURIComponent(name);

  const product = await productModel.findOne({ name: name.trim() });

  const meData = await Me();
  const myLocation = meData.location || null;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product?.name || name,
    image: product?.image || "",
    description: `خرید ${product?.name || name} با کیفیت برتر.`,
    brand: "برنجسار",
    offers: {
      "@type": "Offer",
      priceCurrency: "IRR",
      price: product?.price || 0,
      availability: product?.count > 0 ? "InStock" : "OutOfStock",
    },
  };

  return !!product?.count ? (
    !!meData ? (
      <>
        <Head>
          <title>{product.name} | خرید برنج اصیل ایرانی</title>
          <meta
            name="description"
            content={`خرید ${product.name} با بهترین قیمت و کیفیت. ارسال به سراسر ایران.`}
          />
          <meta
            name="keywords"
            content="خرید برنج, برنج مازندران, برنج اصیل ایرانی, خرید آنلاین برنج"
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
          />
        </Head>

        <div className="w-full sm:h-screen h-auto md:px-40 px-8 sm:pt-56 pt-40 pb-24 flex justify-between gap-24">
          <div className="w-full flex flex-col gap-6">
            <Title title="اطلاعات درخواست سفارش" />
            <p className="xxd:hidden text-center font-bold text-emerald-900/70 text-3xl">
              {name}
            </p>
            <BuyForm
              myLocation={JSON.parse(JSON.stringify(myLocation))}
              name={product.name}
            />
          </div>

          <div className="xxd:flex hidden !w-[50rem] p-12 rounded-3xl flex-col items-center justify-between bg-second/20 shadow-md gap-4">
            <p className="font-light text-4xl text-emerald-600">
              {product.name}
            </p>
            <Image
              src={product.image}
              width={400}
              height={500}
              alt={`تصویر ${product.name}`}
              className="rounded-3xl"
            />

            <div className="w-full h-28 text-emerald-600/90 text-2xl center flex-col gap-4 font-light p-4">
              <div className="w-full flex justify-between items-end">
                <span>هزینه محصول:</span>
                <p className="font-light text-3xl text-emerald-600">
                  {product.price.toLocaleString("fa-IR")}
                  <span className="opacity-0">.</span>ریال
                </p>
              </div>
              <div className="w-full flex justify-between items-end border-b-2 border-b-second pb-3">
                <span>هزینه ارسال:</span>
                <p className="font-light text-3xl text-emerald-600">
                  {(870000).toLocaleString("fa-IR")}
                  <span className="opacity-0">.</span>ریال
                </p>
              </div>
              <div className="w-full flex justify-between items-end text-3xl">
                <span>هزینه کل:</span>
                <p className="font-light text-4xl text-emerald-600 flex">
                  {(product.price + 870000).toLocaleString("fa-IR")}
                  <span className="opacity-0">.</span>ریال
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ) : (
      <PermissionAlert />
    )
  ) : (
    <div className="w-full h-screen center flex-col gap-8 p-6">
      <Head>
        <title>محصول ناموجود | خرید برنج اصیل ایرانی</title>
        <meta
          name="description"
          content="این محصول در حال حاضر ناموجود است. لطفاً محصولات دیگر را بررسی کنید."
        />
      </Head>
      <p className="p-4 rounded-lg bg-rose-500/20 text-rose-700 font-light text-3xl sm:text-start !text-center center shadow-md">
        با عرض پوزش این محصول در انبار ما ناموجود شده در اسرع وقت ان را موجود
        خواهیم کرد.
      </p>
      <Link href={"/"} className="btn bg-second text-first text-2xl">
        محصولات
      </Link>
    </div>
  );
};

export default page;
