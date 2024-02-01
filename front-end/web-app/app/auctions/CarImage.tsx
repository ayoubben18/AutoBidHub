"use client";
import Image from "next/image";
import { useState } from "react";

type Props = {
  image: string;
};

const CarImage = ({ image }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <Image
      src={image}
      fill
      sizes="(max-width:768px) 100vw , (max-width:1200px) 50vw,25vw"
      className={`top-0 object-cover group-hover:opacity-75 duration-700 ease-in-out ${
        loading
          ? "grayscale blur-2xl scale-110"
          : "grayscale-0 blur-0 scale-100"
      }`}
      priority
      alt="image"
      onLoad={() => setLoading(false)}
    />
  );
};

export default CarImage;
