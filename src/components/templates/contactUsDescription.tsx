import Link from "next/link";
import React from "react";

const ContactUsDescription = () => {
  return (
    <div
      data-aos="fade-left"
      data-aos-duration="1000"
      className="w-full lg:w-1/2 flex flex-col gap-12"
    >
      <p className="text-5xl font-bold">
        ما اینجاییم تا پاسخگوی سوالات شما باشیم!
      </p>
      <p className="text-3xl font-bold text-black/40">
        شما برای ما اهمیت ویژه‌ای دارید و هدف ما این است که تجربه‌ای لذت‌بخش و
        به‌یادماندنی از خرید آنلاین برایتان فراهم کنیم. اگر سوالی در مورد
        محصولات ما دارید یا برای ثبت سفارش نیاز به راهنمایی دارید، خوشحال
        می‌شویم که همراه شما باشیم. همچنین اگر پیشنهادی دارید که می‌تواند خدمات
        ما را بهتر کند، لطفاً حتماً با ما در میان بگذارید.
      </p>
      <p className="text-3xl font-bold text-black/40 mb-12">
        هر سوال، نگرانی یا ایده‌ای که از طرف شما مطرح شود، برای ما بسیار ارزشمند
        است. ما اینجا هستیم تا پاسخگوی نیازهای شما باشیم و تجربه خریدی
        منحصر‌به‌فرد برای شما خلق کنیم. کافی است از طریق فرم زیر پیام خود را
        ارسال کنید. تیم ما با دقت پیام شما را بررسی خواهد کرد و در کوتاه‌ترین
        زمان ممکن به شما پاسخ خواهد داد.
      </p>
      <div className="w-full flex gap-8">
        <Link href={"/aboutUs"} className="btn bg-second text-white">
          <button>درباره ما</button>
        </Link>
        <Link href={"/"} className="btn bg-third text-black/40">
          <button>محصولات</button>
        </Link>
      </div>
    </div>
  );
};

export default ContactUsDescription;
