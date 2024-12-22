import Image from "next/image";
import React from "react";
import Atropos from "atropos/react";
import Link from "next/link";

const Product = ({ data }: { data: { name: string; image: string } }) => {
  return (
    <Atropos
      data-aos="zoom-in-up"
      activeOffset={30}
      shadow={false}
      duration={100}
    >
      <div className="llg:w-96 w-64 llg:h-[35rem] llg:p-8 p-4 llg:mb-20 rounded-3xl bg-black/10 overflow-hidden flex flex-col items-center justify-between llg:gap-0 gap-2">
        <Image
          src={data.image}
          width={300}
          height={300}
          alt={`تصویر محصول ${data.name}`}
          className="w-full llg:h-80 object-cover rounded-xl"
        />
        <h2 className="w-full text-center llg:text-3xl text-xl font-bold tsh backdrop-blur-3xl rounded-full px-6 py-4 text-first bg-black/10">
          {data.name}
        </h2>
        <Link
          href={`/buy-rice/${data.name}`}
          className="w-full btn bg-green-500 text-first text-3xl center"
        >
          خرید
        </Link>
      </div>
    </Atropos>
  );
};

export default Product;
