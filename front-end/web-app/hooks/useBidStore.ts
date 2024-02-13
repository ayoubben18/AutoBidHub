import {Bid} from "@/types";
import {create} from 'zustand'
import {createWithEqualityFn} from "zustand/traditional";

type State = {
    bids: Bid[];
    open: boolean
    setOpen: (value: boolean) => void
}

type Actions = {
    setBids: (bids: Bid[]) => void;
    addBid: (bid: Bid) => void;
}

export const useBidStore = createWithEqualityFn<State & Actions>(
    (set) => ({
        bids: [],
        open: true,
        setOpen: (value: boolean) => {
            set(() => ({
                open: value,
            }))
        },
        setBids: (bids: Bid[]) => {
            set(() => ({bids}))
        },
        addBid: (bid: Bid) => {
            set((state) => ({
                bids: !state.bids.find(x => x.id === bid.id) ? [bid, ...state.bids] : [...state.bids]
            }))
        },
    })
)