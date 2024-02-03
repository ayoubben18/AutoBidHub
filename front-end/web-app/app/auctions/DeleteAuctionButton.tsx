"use client";

import { useMutation } from "@tanstack/react-query";
import { deleteAuction } from "../actions/auctionActions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
interface Props {
  id: string;
}
const DeleteAuctionButton = ({ id }: Props) => {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteAuction,
    onSuccess: (res) => {
      if (res.error) {
        console.log(res.error);
        toast.error(res.error.status + " : " + res.error.message);
      } else {
        toast.success("Successfully Deleted!");
        router.push("/");
      }
    },
  });
  return (
    <button
      className=" btn btn-error btn-outline btn-sm"
      onClick={() => mutate(id)}
      disabled={isPending}
    >
      Delete Auction
    </button>
  );
};

export default DeleteAuctionButton;
