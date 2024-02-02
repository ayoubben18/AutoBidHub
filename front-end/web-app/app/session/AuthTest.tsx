"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { UpdateAuctionTest } from "../actions/auctionActions";
import { useRouter } from "next/navigation";

const AuthTest = () => {
  const router = useRouter();
  const {
    mutate: update,
    isPending,
    data,
  } = useMutation({
    mutationFn: UpdateAuctionTest,
  });

  return (
    <div>
      <button
        className="btn btn-outline"
        disabled={isPending}
        onClick={() => update()}
      >
        update
      </button>
      <div>{JSON.stringify(data, null, 2)}</div>
    </div>
  );
};

export default AuthTest;
