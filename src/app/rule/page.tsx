"use client";
import React from "react";
import Title from "@/components/modules/Title";
import Hr from "@/components/modules/Hr";

const Rule = () => {
  return (
    <div className="w-full flex flex-col gap-20 pt-56 pb-24 px-8 md:px-40 ">
      <div className="flex flex-col">
        <Title title="قوانین و مقررات استفاده از سایت برنجسار" />
        <p className="text-[1.6rem] font-light">
          با تشکر از انتخاب شما برای خرید برنج از سایت برنجسار. برای استفاده
          بهینه از خدمات سایت، لطفاً به دقت قوانین و مقررات زیر را مطالعه
          نمایید:
        </p>
      </div>

      <div className="flex flex-col">
        <Title title="1. ثبت‌نام کاربران:" />
        <p className="text-[1.6rem] font-light">
          برای خرید برنج از سایت، کاربران باید در سایت ثبت‌نام کرده و اطلاعات
          خود را به درستی وارد کنند. این اطلاعات به منظور تکمیل فرآیند خرید و
          ارسال سفارشات جمع‌آوری می‌شود و در اختیار شخص ثالث قرار نخواهد گرفت.
        </p>
      </div>

      <div className="flex flex-col">
        <Title title="2. اطلاعات تماس:" />
        <p className="text-[1.6rem] font-light">
          مسئولیت صحت اطلاعات تماس مانند شماره تلفن، آدرس و ایمیل بر عهده کاربر
          است. در صورت بروز هرگونه مشکل در ارسال سفارش، مسئولیت آن بر عهده کاربر
          خواهد بود.
        </p>
      </div>
      <div className="flex flex-col">
        <Title title="3. سیاست‌های ارسال و تحویل:" />
        <p className="text-[1.6rem] font-light">
          تمام سفارشات پس از تکمیل خرید در سایت، در کوتاه‌ترین زمان ممکن ارسال
          می‌شوند. زمان دقیق ارسال و تحویل سفارش بستگی به محل سکونت شما دارد.
          هزینه‌های ارسال در هنگام ثبت سفارش محاسبه خواهد شد.
        </p>
      </div>
      <div className="flex flex-col">
        <Title title="4. شرایط خرید و پرداخت:" />
        <p className="text-[1.6rem] font-light">
          تمامی پرداخت‌ها از طریق درگاه‌های معتبر اینترنتی انجام می‌شود. پس از
          تکمیل فرآیند خرید، مشتری یک کد پیگیری دریافت خواهد کرد که می‌تواند
          وضعیت سفارش خود را پیگیری نماید.
        </p>
      </div>
      <div className="flex flex-col">
        <Title title="5. نقد و بررسی:" />
        <p className="text-[1.6rem] font-light">
          کاربران می‌توانند پس از دریافت محصول، نقد و بررسی خود را درباره کیفیت
          برنج‌ها ثبت کنند. نظرات شما برای بهبود کیفیت خدمات و محصولات سایت مورد
          استفاده قرار خواهد گرفت.
        </p>
      </div>
      <div className="flex flex-col">
        <Title title="6. سیاست‌های بازگشت کالا:" />
        <p className="text-[1.6rem] font-light">
          در صورتی که محصول خریداری شده دچار مشکل فنی یا نقص باشد، کاربران
          می‌توانند درخواست بازگشت کالا را به سایت ارسال کنند. این درخواست باید
          حداکثر 7 روز پس از دریافت محصول ارسال شود.
        </p>
      </div>
      <div className="flex flex-col">
        <Title title="7. حریم خصوصی و امنیت:" />
        <p className="text-[1.6rem] font-light">
          تمام اطلاعات کاربران تحت هیچ شرایطی به شخص ثالث داده نخواهد شد. ما
          تمامی اطلاعات شما را با بالاترین سطح امنیتی حفظ می‌کنیم و در برابر
          تهدیدات امنیتی محافظت می‌نماییم.
        </p>
      </div>
      <div className="flex flex-col">
        <Title title="8. تغییرات قوانین:" />
        <p className="text-[1.6rem] font-light">
          حق تغییر قوانین و مقررات سایت در هر زمان برای برنجسار محفوظ است.
          هرگونه تغییرات در این قوانین از طریق سایت به اطلاع کاربران خواهد رسید.
        </p>
      </div>

      <Hr />
    </div>
  );
};

export default Rule;
