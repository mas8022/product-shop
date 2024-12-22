import React from "react";
import productModel from "../../../models/product";
import CmsProduct from "@/components/modules/CmsProduct";

const CmsProducts: React.FC = async () => {
  const products = await productModel.find({}, "-__v");

  return (
    <div className="w-full">
      <div className="w-full flex flex-col items-end gap-40 py-[5rem] md:pr-14">
        <div className="w-full flex justify-center">
          {products?.length ? (
            <div className="grid grid-cols-1 xxd:grid-cols-2 lgg:grid-cols-3  2xl:grid-cols-4 gap-8">
              {products?.length
                ? products.map((item) => (
                    <CmsProduct
                      data={JSON.parse(JSON.stringify(item))}
                      key={item._id}
                    />
                  ))
                : null}
            </div>
          ) : (
            <div className="w-full h-56 flex items-center justify-center border-y-2 border-second bg-second/15 text-second text-4xl rounded-lg">
              محصولی در این قسمت وجود ندارد
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CmsProducts;
