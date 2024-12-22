import React, { useEffect } from "react";

// تایپ props برای کامپوننت
interface BgProps {
  active: boolean;
  setActive: (active: boolean) => void;
}

const Bg: React.FC<BgProps> = ({ active, setActive }) => {
  useEffect(() => {
    const closeSideBarHandler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.classList.contains("bgActive")) {
        setActive(false);
      }
    };

    window.addEventListener("click", closeSideBarHandler);

    return () => {
      window.removeEventListener("click", closeSideBarHandler);
    };
  }, [setActive]);

  return (
    <div
      className={
        active
          ? "bgActive w-full h-full bg-black/20 fixed top-0 left-0 backdrop-blur-[1px] transition-all duration-1000 z-[1001]"
          : "hidden transition-all duration-1000"
      }
    ></div>
  );
};

export default Bg;
