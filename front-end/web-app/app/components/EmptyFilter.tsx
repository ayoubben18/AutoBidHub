"use client";
import { useParamsStore } from "@/hooks/useParamsStore";
import React from "react";
import Heading from "./Heading";
import { signIn } from "next-auth/react";

interface Props {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  showLogin?: boolean;
  callbackUrl?: string;
}

const EmptyFilter = ({
  showReset,
  title = "No matches for this filter",
  subtitle = "Try changing or resetting the filter",
  showLogin,
  callbackUrl,
}: Props) => {
  const { reset } = useParamsStore();
  return (
    <div className=" h-[40vh] flex flex-col gap-2 justify-center items-center shadow-lg">
      <Heading title={title} subtitle={subtitle} center />
      <div className=" mt-4 ">
        {showReset && (
          <button className="btn btn-outline btn-success" onClick={reset}>
            Remove Filters
          </button>
        )}
        {showLogin && (
          <button
            className="btn btn-outline btn-success"
            onClick={() => signIn("id-server", { callbackUrl })}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyFilter;
