"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import CommentBox from "../modules/CommentBox";
import { Document, Schema } from "mongoose";

interface IUser {
  _id: Schema.Types.ObjectId;
  fullName: string;
}

interface ISiteImprovementComment extends Document {
  _id: Schema.Types.ObjectId | string;
  comment: string;
  user: IUser;
  createdAt: Date;

}

const CommentsSlider = ({
  comments,
}: {
  comments: ISiteImprovementComment[];
}) => {
  return (
    <Swiper
      breakpoints={{
        100: { slidesPerView: 1 },
        800: { slidesPerView: 2 },
        1000: { slidesPerView: 3 },
      }}
      spaceBetween={50}
      slidesPerView={3}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      modules={[Autoplay]}
      loop={true}
      className="!py-10"
    >
      {comments.length
        ? comments.map((item: ISiteImprovementComment) => (
            <SwiperSlide key={item._id.toString()}>
              <CommentBox data={item as any} />
            </SwiperSlide>
          ))
        : null}
    </Swiper>
  );
};

export default CommentsSlider;
