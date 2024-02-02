"use server";

import { Auction, PagedResult } from "@/types";
import { getTokenWorkAround } from "./authActions";

export const getData = async (query: string): Promise<PagedResult<Auction>> => {
  const res = await fetch(`http://localhost:6001/search${query}`);

  if (!res.ok) throw new Error("Failed to fetch");

  return res.json();
};

export async function UpdateAuctionTest() {
  const data = {
    mileage: Math.floor(Math.random() * 100000) + 1,
  };

  const token = await getTokenWorkAround();

  const res = await fetch(
    "http://localhost:6001/auctions/afbee524-5972-4075-8800-7d1f9d7b0a0c",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token?.access_token,
      },
      body: JSON.stringify(data),
    }
  );
  if (!res.ok) return { status: res.status, message: res.statusText };

  return res.statusText;
}
