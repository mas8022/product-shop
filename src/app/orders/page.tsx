"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import OrderBox from "@/components/modules/OrderBox";

const Orders = () => {
  return (
    <div className="w-full flex justify-center items-center pt-56 pb-44 px-8 md:px-40">
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="!pb-14"
      >
        <SwiperSlide>
          <OrderBox />
        </SwiperSlide>
        <SwiperSlide>
          <OrderBox />
        </SwiperSlide>
        <SwiperSlide>
          <OrderBox />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Orders;
