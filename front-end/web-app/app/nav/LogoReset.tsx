"use client";
import { useParamsStore } from "@/hooks/useParamsStore";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { PiCarSimpleThin } from "react-icons/pi";

const LogoReset = () => {
  const router = useRouter();
  const pathname = usePathname();
  const reset = useParamsStore((state) => state.reset);
  const doReset = () => {
    if (pathname !== "/") router.push("/");
    reset();
  };
  return (
    <div>
      <button
        className="btn btn-ghost text-2xl gap-2 text-black font-bold"
        onClick={doReset}
      >
        <PiCarSimpleThin size={30} />
        AutoBidHub
      </button>
    </div>
  );
};

export default LogoReset;
