"use server";

import { Auction, PagedResult } from "@/types";

export const getData = async (query: string): Promise<PagedResult<Auction>> => {
  const res = await fetch(`http://localhost:6001/search${query}`);

  if (!res.ok) throw new Error("Failed to fetch");

  return res.json();
};
