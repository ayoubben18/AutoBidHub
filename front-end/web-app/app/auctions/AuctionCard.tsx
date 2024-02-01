import React from "react";
import CountdownTimer from "./CountdownTimer";
import CarImage from "./CarImage";
import { Auction } from "@/types";
type Props = {
  auction: Auction;
};
const AuctionCard = ({ auction }: Props) => {
  return (
    <a href="#" className="group">
      <div className="w-full bg-gray-200 aspect-w-16 aspect-h-10 rounded-lg overflow-hidden">
        <div>
          {" "}
          <CarImage image={auction.imageUrl} />
          <div className=" absolute bottom-2 left-2">
            <CountdownTimer auctionEnd={auction.auctionEnd} />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <h3 className=" text-gray-700 badge badge-lg">
          {auction.make} {auction.model}
        </h3>
        <p className=" font-semibold text-sm badge badge-outline">
          {auction.year}
        </p>
      </div>
    </a>
  );
};

export default AuctionCard;
