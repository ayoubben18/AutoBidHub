"use server";

import {Auction, Bid, PagedResult} from "@/types";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { FieldValues } from "react-hook-form";
import { revalidatePath } from "next/cache";

export const getData = async (query: string): Promise<PagedResult<Auction>> => {
  return await fetchWrapper.get(`search${query}`);
};

export const createAuction = async (data: FieldValues) => {
  return await fetchWrapper.post("auctions", data);
};

export const updateAuction = async (data: FieldValues) => {
  const res = await fetchWrapper.put(`auctions/${data.id}`, data);
  revalidatePath(`auctions/${data.id}`);
  return res;
};
export const getDetailedViewData = async (id: string): Promise<Auction> => {
  return await fetchWrapper.get(`auctions/${id}`);
};

export const deleteAuction = async (id: string) => {
  const res = await fetchWrapper.remove(`auctions/${id}`);
  revalidatePath(`auctions/${id}`);
  return res;
};

export async function getBidsForAuction(id:string):Promise<Bid[]>{
  return await fetchWrapper.get(`bids/${id}`);
}
