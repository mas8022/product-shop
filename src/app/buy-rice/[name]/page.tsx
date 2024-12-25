import React from "react";
import Head from "next/head";
import Link from "next/link";
import productModel from "../../../../models/product.js";
import { Me } from "../../../../utils/me";
import BuyForm from "@/components/templates/BuyForm";
import PermissionAlert from "@/components/modules/PermissionAlert";

const page = async ({ params }: { params: { name: string } }) => {
  let { name } = await params;
  name = decodeURIComponent(name);

  const product = await productModel.findOne({ name: name.trim() });
  
  const meData = await Me();
  const myLocation = meData?.location || null;

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
        

        <BuyForm
          myLocation={JSON.parse(JSON.stringify(myLocation))}
          name={product.name}
          price={product.price}
          image={product.image}
        />
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
