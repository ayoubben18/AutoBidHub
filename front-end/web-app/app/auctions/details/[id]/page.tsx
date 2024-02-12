import { getDetailedViewData} from "@/app/actions/auctionActions";
import Heading from "@/app/components/Heading";
import React from "react";
import CountdownTimer from "../../CountdownTimer";
import CarImage from "../../CarImage";
import DetailedSpecs from "./DetailedSpecs";
import Link from "next/link";
import { getCurrentUser } from "@/app/actions/authActions";
import DeleteAuctionButton from "../../DeleteAuctionButton";
import {BidList} from "@/app/auctions/details/[id]/BidList";
import {BidForm} from "@/app/auctions/details/[id]/BidForm";

const page = async ({ params }: { params: { id: string } }) => {
  const data = await getDetailedViewData(params.id);
  const user = await getCurrentUser();
  return (
    <div className=" p-10">
      <div className=" flex justify-between flex-wrap gap-4">
        <div className=" flex items-center gap-3">
          <Heading title={`${data.make} ${data.model}`} />
          {user?.username === data.seller && (
            <div className=" flex gap-2">
              <div className="btn btn-secondary btn-sm btn-outline">
                <Link href={`/auctions/update/${data.id}`}>Update Auction</Link>
              </div>
              <DeleteAuctionButton id={data.id} />
            </div>
          )}
        </div>
        <div className=" flex gap-3">
          <h3 className=" text-2xl font-semibold">Time Remaining</h3>
          <CountdownTimer auctionEnd={data.auctionEnd} />
        </div>
      </div>

      <div className=" grid grid-cols-1 2xl:grid-cols-2 gap-6 mt-3">
        <div className=" w-full bg-gray-200 aspect-h-10 aspect-w-16 rounded-lg overflow-hidden">
          <CarImage image={data.imageUrl} />
        </div>
        <BidList user={user!} auction={data}/>

      </div>
      <div className=" mt-3 grid grid-cols-1">
        <DetailedSpecs auction={data} />
      </div>
    </div>
  );
};

export default page;
