import React from "react";

const AvailabilityAlert = ({text}: {text:string}) => {
  return (
    <div className="w-full h-56 flex items-center justify-center border-y-2 border-second/70 bg-second/15 dark:bg-second/5 text-second text-4xl rounded-lg">
      {text}
    </div>
  );
};

export default AvailabilityAlert;
