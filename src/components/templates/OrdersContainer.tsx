"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import OrderBox from "../modules/OrderBox";
import { ObjectId } from "mongoose";
import AvailabilityAlert from "../modules/AvailabilityAlert";

interface Order {
  _id: string | ObjectId;
  name: string;
  createAt: string;
}

const OrdersContainer = ({ data }: { data: Order[] }) => {
  return data.length ? (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="!pb-14"
    >
      {data.map((item) => (
        <SwiperSlide key={item._id.toString()}>
          <OrderBox data={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <AvailabilityAlert text="سفارشی وجود ندارد" />
  );
};

export default OrdersContainer;
