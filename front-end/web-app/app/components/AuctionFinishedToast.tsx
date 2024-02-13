import {Auction, AuctionFinished} from "@/types";
import Link from "next/link";
import Image from "next/image";
import {numberWithCommas} from "@/app/lib/numberWithComma";

type Props = {
    finishedAuction: AuctionFinished
    auction: Auction
}
export const AuctionFinishedToast = ({finishedAuction, auction}: Props) => {
    return (
        <Link href={`/auctions/details/${auction.id}`} className='flex flex-col items-center'>
            <div className='flex flex-row items-center gap-2'>
                <Image src={auction.imageUrl} alt='image' height={80} width={80} className='rounded-lg w-auto h-auto'/>
                <div className='flex flex-col'>
                    <span>New Auction! {auction.make} {auction.model} has finished</span>
                    {finishedAuction.itemSold && finishedAuction.amount ? (
                        <p>Congrats to {finishedAuction.winner} who has wom this auction for
                            ${numberWithCommas(finishedAuction.amount)}</p>
                    ) : (
                        <p>This item did not sell</p>
                    )}
                </div>
            </div>
        </Link>
    );
};