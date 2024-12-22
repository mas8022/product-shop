const useSanitizeInput = (value: string): string | undefined => {
  if (typeof window !== "undefined") {
    const temp = document.createElement("div");
    temp.textContent = value;
    const sanitizedValue = temp.innerHTML;
    temp.remove();
    return sanitizedValue;
  }
};

export { useSanitizeInput };
