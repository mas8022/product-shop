"use client";
import Image from "next/image";
import React, { memo } from "react";
import { MoonLoader } from "react-spinners";

interface UploaderProps {
  image?: boolean;
  profile?: string;
  name?: string;
  label?: string;
  customClassName?: string;
  loader?: boolean;
  formHandler: {
    setFieldValue: (field: string, value: File | null | undefined) => void;
  };
}

const Uploader: React.FC<UploaderProps> = memo(
  ({
    image = false,
    profile = "",
    name = "",
    label = "",
    customClassName = "",
    loader = false,
    formHandler,
  }) => {
    return (
      <label className={`relative ${customClassName}`}>
        {image && (
          <Image
            src={profile?.trim() || "/images/profile.jpg"}
            placeholder="blur"
            blurDataURL={profile?.trim() || "/images/profile.jpg"}
            width={300}
            height={300}
            alt="not found"
            className="absolute size-full object-cover !border-0 !outline-none !ring-0"
          />
        )}

        {loader ? <MoonLoader size={20} color="#fff" /> : <span>{label}</span>}

        <input
          type="file"
          name={name}
          onChange={(e) =>
            formHandler.setFieldValue(name, e.currentTarget.files?.[0] || null)
          }
          id="fileData"
          hidden
        />
      </label>
    );
  }
);

export default Uploader;
