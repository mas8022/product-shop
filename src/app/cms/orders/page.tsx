import CmsOrderCart from "@/components/modules/CmsOrderCart";
import React from "react";
import connectToDb from "../../../../configs/db";
import orderModel from "../../../../models/orderModel";
import AvailabilityAlert from "@/components/modules/AvailabilityAlert";

const page = async () => {
  await connectToDb();
  const orders = await orderModel
    .find({ status: "success" }, "-price -status -authority -updatedAt -__v")
    .populate("user", "fullName phone");

  return (
    <div className="w-full flex justify-center">
      {orders.length ? (
        <div className="grid grid-cols-1 lgg:grid-cols-2  2xl:grid-cols-3 gap-8">
          {orders.map((item) => (
            <CmsOrderCart
              key={item._id.toString()}
              data={JSON.parse(JSON.stringify(item))}
            />
          ))}
        </div>
      ) : (
        <AvailabilityAlert text="سفارشی وجود ندارد" />
      )}
    </div>
  );
};

export default page;
