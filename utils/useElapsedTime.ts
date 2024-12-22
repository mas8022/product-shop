"use client";

import { useEffect, useState } from "react";

function useElapsedTime(createdAt: Date | null): string {
  const [elapsedTime, setElapsedTime] = useState<string>("");

  useEffect(() => {
    if (!createdAt) return;

    const calculateElapsedTime = () => {
      const now = new Date();
      const createdDate = new Date(createdAt);
      const diffMs = now.getTime() - createdDate.getTime();

      if (diffMs < 0) {
        setElapsedTime("در آینده است");
        return;
      }

      const diffSeconds = Math.floor(diffMs / 1000);
      const minutes = Math.floor(diffSeconds / 60) % 60;
      const hours = Math.floor(diffSeconds / 3600) % 24;
      const days = Math.floor(diffSeconds / (3600 * 24));

      let result = "";
      if (days > 0) result += `${days}روز `;
      if (hours > 0 || days > 0) result += `${hours}ساعت `;
      result += `${minutes}دقیقه قبل`;

      setElapsedTime(result.trim());
    };

    calculateElapsedTime();

    const interval = setInterval(calculateElapsedTime, 60000);
    return () => clearInterval(interval);
  }, [createdAt]);

  return elapsedTime;
}

export default useElapsedTime;
