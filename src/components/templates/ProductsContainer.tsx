"use client";
import React from "react";
import Product from "../modules/Product";

const ProductContainer = ({
  data,
}: {
  data: { name: string; image: string }[];
}) => {
  return (
    <section
      className="w-full flex items-center justify-center"
      aria-labelledby="products-heading"
    >
      <h2 id="products-heading" className="sr-only">
        لیست محصولات برنج با کیفیت
      </h2>

      <div className="flex flex-wrap items-center justify-center llg:p-10 rounded-3xl gap-8">
        {data.length ? (
          data.map((item, index) => <Product key={index} data={item} />)
        ) : (
          <p className="text-center text-lg font-semibold text-gray-600">
            محصولی برای نمایش وجود ندارد.
          </p>
        )}
      </div>
    </section>
  );
};

export default ProductContainer;
