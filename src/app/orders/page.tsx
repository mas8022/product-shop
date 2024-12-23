import OrdersContainer from "@/components/templates/OrdersContainer";
import React from "react";
import connectToDb from "../../../configs/db";
import orderModel from "../../../models/orderModel";
const Orders = async () => {
  await connectToDb();
  const orders = await orderModel.find({ status: "send" }, "createdAt name");
  return (
    <div className="w-full flex justify-center items-center pt-56 pb-44 px-8 md:px-40">
      <OrdersContainer data={JSON.parse(JSON.stringify(orders))} />
    </div>
  );
};

export default Orders;
