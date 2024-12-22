"use client";
import { useCallback, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

type UseToggleReturn = [
  boolean,
  (event?: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void
];

const useToggle = (keyName: string): UseToggleReturn => {
  const [isOpen, setIsOpen] = useLocalStorage<any>(keyName, false);

  const toggleOpen = (
    event?: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ): void => {
    event?.stopPropagation();

    setIsOpen((prevIsOpen: any) => !(prevIsOpen ?? false));
  };

  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  useEffect(() => {
    const handleClickOutside = () => {
      close();
    };

    if (isOpen) {
      window.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, close]);

  return [isOpen ?? false, toggleOpen];
};

export default useToggle;
