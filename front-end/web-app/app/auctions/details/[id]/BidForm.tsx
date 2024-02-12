'use client'
import {useMutation} from "@tanstack/react-query";
import {placeBidForAuction} from "@/app/actions/auctionActions";
import toast from "react-hot-toast";
import {FieldValues, useForm} from "react-hook-form";
import {useBidStore} from "@/hooks/useBidStore";

type Props = {
    auctionId: string;
    highBid: number;
}
export const BidForm = ({auctionId, highBid}: Props) => {
    const {register, formState: {errors}, handleSubmit, reset} = useForm();
    const {addBid} = useBidStore();
    const {mutate, isPending} = useMutation({
        mutationFn: placeBidForAuction,
        onSuccess: (res) => {
            if (res.error) {
                // console.log(res.error.message);
                toast.error(res.error.status + " : " + res.error.message);
            } else {
                addBid(res);
                reset();
                toast.success("Bid Placed!");
            }
        },

    })

    function onSubmit(data: FieldValues) {
        mutate({auctionId,amount:+data.amount});
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center border-2 gap-1
        rounded-lg py-2">
            <input type='number' {...register('amount')} placeholder={`Enter your bids (minimum bid is ${highBid})`} className="input input-bordered input-accent w-full "/>
            <button disabled={isPending} className='btn btn-outline'>Add</button>
        </form>
    );
};