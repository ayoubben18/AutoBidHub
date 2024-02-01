"use client";
import { useParamsStore } from "@/hooks/useParamsStore";
import React from "react";
import { PiCarSimpleThin } from "react-icons/pi";

const LogoReset = () => {
  const reset = useParamsStore((state) => state.reset);
  return (
    <div>
      <button
        className="btn btn-ghost text-2xl gap-2 text-black font-bold"
        onClick={reset}
      >
        <PiCarSimpleThin size={30} />
        AutoBidHub
      </button>
    </div>
  );
};

export default LogoReset;
