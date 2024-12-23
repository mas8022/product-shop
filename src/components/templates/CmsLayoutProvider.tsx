"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, ReactNode } from "react";
import AvailabilityAlert from "../modules/AvailabilityAlert";

interface CmsLayoutProviderProps {
  children: ReactNode;
}

const CmsLayoutProvider: React.FC<CmsLayoutProviderProps> = ({ children }) => {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  useEffect(() => {
    fetch("/api/resetToken")
      .then((res) => res.json())
      .then((result) => {
        if (!result.roll || result.roll === "USER") {
          router.replace("/login");
        } else {
          setPending(true);
        }
      });
  }, []);

  return pending ? (
    children
  ) : (
    <div className="w-full h-screen center">
      <AvailabilityAlert text="در حال بارگذاری..." />
    </div>
  );
};

export default CmsLayoutProvider;
