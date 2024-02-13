"use client";
import React from "react";
import Countdown, {zeroPad} from "react-countdown";
import {useBidStore} from "@/hooks/useBidStore";
import {usePathname} from "next/navigation";

type Props = {
    auctionEnd: string;
};

const renderer = ({
                      days,
                      hours,
                      minutes,
                      seconds,
                      completed,
                  }: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
}) => {

    return (
        <div
            className={`
            border-2 border-white text-white py-1 px-2 rounded-lg justify-center flex
            ${
                completed
                    ? "bg-red-600"
                    : days === 0 && hours < 10
                        ? " bg-amber-400"
                        : "bg-green-600"
            }
          `}
        >
            {completed ? (
                <span>Finished</span>
            ) : (
                <span suppressHydrationWarning={true}>
          {zeroPad(days)}:{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
            )}
        </div>
    );
};

const CountdownTimer = ({auctionEnd}: Props) => {
    const {setOpen} = useBidStore();
    const pathname = usePathname();

    function AuctionFinished() {
        if (pathname.startsWith('/auctions/details')) {
            setOpen(false);
        }
    }

    return (
        <div>
            <Countdown date={auctionEnd} renderer={renderer} onComplete={AuctionFinished}/>
        </div>
    );
};

export default CountdownTimer;
