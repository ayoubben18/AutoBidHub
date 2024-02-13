'use client';

import {Auction, Bid} from "@/types";
import {useBidStore} from "@/hooks/useBidStore";
import {useQuery} from "@tanstack/react-query";
import {getBidsForAuction} from "@/app/actions/auctionActions";
import toast from "react-hot-toast";
import Heading from "@/app/components/Heading";
import {BidItem} from "@/app/auctions/details/[id]/BidItem";
import React, {useEffect} from "react";
import {User} from "next-auth";
import {BidForm} from "@/app/auctions/details/[id]/BidForm";
import {numberWithCommas} from "@/app/lib/numberWithComma";
import EmptyFilter from "@/app/components/EmptyFilter";

type Props = {
    user: User | null
    auction: Auction
}
export const BidList = ({user, auction}: Props) => {

    const {bids, setBids} = useBidStore();
    const {open, setOpen} = useBidStore();
    const openForBids = new Date(auction.auctionEnd) > new Date();
    const highBid = bids.reduce((prev, current) => prev > current.amount ? prev : current.bidStatus.includes('Accepted') ? current.amount : prev, 0);

    const {isLoading} = useQuery({
        queryKey: ['bids'],
        queryFn: async () => {
            try {
                const res: any = await getBidsForAuction(auction.id);
                setBids(res as Bid[]);
                return res;
            } catch (e: any) {
                toast.error(e.status + ':' + e.message)
                return null;
            }

        },
    })
    useEffect(() => {
        setOpen(openForBids);
    }, [openForBids, setOpen]);
    if (isLoading) return <span className="loading loading-ring loading-lg self-center justify-self-center"></span>;
    return (
        <div className=" shadow-md rounded-lg">
            <div className='py-2 px-4 bg-white'>
                <div className='sticky top-0 bg-white p-2'>
                    <Heading title={`Current high bid is $${numberWithCommas(highBid)}`}/>
                </div>
            </div>

            <div className='overflow-auto h-[400px] flex flex-col-reverse px-2'>
                {bids.length === 0 ? (
                    <EmptyFilter
                        title='No bids for this item'
                        subtitle='Please feel free to make a bid'/>
                ) : (
                    <>
                        {bids.map((bid) => (
                            <BidItem key={bid.id} bid={bid}/>
                        ))}
                    </>
                )}
            </div>
            <div>
                {!open ? (<div className=' flex items-center justify-center p-2 text-lg font-semibold'>
                        This Auction Has finished
                    </div>) :
                    !user ?
                        <div className=' flex items-center justify-center p-2 text-lg font-semibold'>
                            Please login to be able to make a bid
                        </div>
                        : user && user.username === auction.seller ? (
                            <div className=' flex items-center justify-center p-2 text-lg font-semibold'>
                                You cannot bid on your own auction
                            </div>
                        ) : (
                            <BidForm auctionId={auction.id} highBid={highBid}/>
                        )
                }</div>
        </div>
    );
};