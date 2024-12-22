"use client";
import React, { memo } from "react";
import Image from "next/image";
import Hr from "@/components/modules/Hr";
import Aos from "../../../utils/Aos";

const page = () => {
  return (
    <div className="w-full flex flex-col px-6 sm:px-24 sm:pt-0 p-20">
      <Aos />
      <Hr />
      <Hr />
      <div
        data-aos="fade-left"
        className="w-full flex items-start justify-between gap-40 mb-20"
      >
        <div className="w-full child:text-black">
          <p className="lg:text-[3rem] text-[2rem] font-bold">
            اصالت برنج مازندرانی
          </p>
          <p className="text-[1.7rem] font-light mb-16 text-black/70">
            در برنجسار اصالت و کیفیت حرف اول را می‌زند. تمامی برنج‌های ما از دل
            مزارع سرسبز مازندران تهیه می‌شوند، جایی که کشاورزان باتجربه با دقت و
            دانش خود برنجی اصیل و خالص تولید می‌کنند. ما متعهدیم که طعم و عطر
            واقعی برنج ایرانی را به سفره‌های شما بیاوریم تا لحظات خوشی را در
            کنار خانواده تجربه کنید.
          </p>
          <p className="lg:text-[3rem] text-[2rem] font-bold">
            تضمین کیفیت و سلامت
          </p>
          <p className="text-[1.7rem] font-light mb-16 text-black/70">
            ما مستقیماً با کشاورزان محلی همکاری می‌کنیم و تلاش می‌کنیم تا
            محصولاتی را از میان بهترین برداشت‌ها انتخاب کنیم. هرچند امکان بررسی
            تمام مراحل کاشت و برداشت وجود ندارد، اما سعی ما بر این است که
            محصولاتی ارائه دهیم که استانداردهای لازم را از لحاظ اصالت و کیفیت
            داشته باشند.
          </p>
        </div>
        <Image
          src={"/images/farmer.png"}
          width={500}
          height={500}
          alt="about us title"
          className="w-1/5 object-cover lg:block hidden"
        />
      </div>
      <div
        data-aos="fade-right"
        className="w-full flex items-center justify-between gap-32"
      >
        <Image
          src={"/images/rices.png"}
          width={500}
          height={500}
          alt="about us title"
          className="w-2/6 object-cover lg:block hidden"
        />
        <div className="lg:w-2/3 w-full child:text-black">
          <p className="lg:text-[3rem] text-[2rem] font-bold">
            حمایت از کشاورزان محلی
          </p>
          <p className="text-[1.7rem] font-light mb-16 text-black/70">
            برنجسار تنها یک فروشگاه نیست، بلکه پلی است میان شما و کشاورزان
            زحمتکش مازندرانی. ما با خرید مستقیم از این کشاورزان، نه تنها به
            ارائه برنج با کیفیت بالا کمک می‌کنیم، بلکه به پایداری کشاورزی و
            حمایت از اقتصاد محلی نیز متعهدیم. با خرید از ما، شما نیز در این مسیر
            همراه هستید.
          </p>
          <p className="lg:text-[3rem] text-[2rem] font-bold">
            خرید آسان و سریع
          </p>
          <p className="text-[1.7rem] font-light mb-16 text-black/70">
            ما در برنجسار تلاش کرده‌ایم تا تجربه‌ای راحت و سریع از خرید آنلاین
            برای شما فراهم کنیم. از طریق وب‌سایت ما می‌توانید با چند کلیک ساده،
            برنجی با کیفیت بالا سفارش دهید و در کمترین زمان ممکن درب منزل تحویل
            بگیرید. لذت یک خرید آسان و مطمئن را با ما تجربه کنید.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
