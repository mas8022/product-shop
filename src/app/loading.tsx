import AvailabilityAlert from "@/components/modules/AvailabilityAlert";
import React from "react";

const loading = () => {
  return (
    <div className="w-full h-screen center">
      <AvailabilityAlert text="در حال بارگذاری..." />
    </div>
  );
};

export default loading;
