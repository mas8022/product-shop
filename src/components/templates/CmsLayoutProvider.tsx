"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, ReactNode } from "react";

interface CmsLayoutProviderProps {
  children: ReactNode;
}

const CmsLayoutProvider: React.FC<CmsLayoutProviderProps> = ({ children }) => {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  useEffect(() => {
    fetch("/api/resetToken")
      .then((res) => res.json())
      .then(async (result) => {
        if (!result.roll || result.roll === "USER") {
          await router.replace("/login");
        } else {
          setPending(true);
        }
      });
  }, []);

  return pending ? children : null;
};

export default CmsLayoutProvider;
