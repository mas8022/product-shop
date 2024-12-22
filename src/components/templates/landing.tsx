"use client";
import ProductsContainer from "../templates/ProductsContainer";
import Aos from "../../../utils/Aos";
import { ObjectId } from "mongoose";

const Landing = ({
  data,
}: {
  data: { _id: string | ObjectId; name: string; image: string }[];
}) => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center sm:px-20 p-4 py-44 image landingImage">
      <div className="w-full flex flex-col items-center gap-8">
        <Aos />
        <h1
          data-aos="fade-up"
          data-aos-duration="1000"
          className="text-5xl sm:text-7xl font-bold text-center text-white tsh leading-normal"
        >
          خرید مستقیم برنج مازندرانی با کیفیت عالی
        </h1>

        <p
          data-aos="fade-up"
          data-aos-duration="2000"
          className="xm:block hidden text-3xl sm:text-4xl font-bold text-center text-white tsh p-8 bg-black/10 backdrop-blur-sm rounded-3xl"
        >
          لذت خرید مستقیم برنج مازندرانی از کشاورز به خانه شما. بهترین کیفیت،
          قیمت مناسب و ارسال سریع. همین حالا سفارش دهید!
        </p>

        <ProductsContainer data={data} />
      </div>
    </div>
  );
};

export default Landing;
