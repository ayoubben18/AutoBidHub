"use client";
import React, {useEffect, useState} from "react";
import {FieldValues, useForm} from "react-hook-form";
import Input from "../components/Input";
import {UploadDropzone} from "@/utils/uploadthing";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import DateInput from "../components/DateInput";
import {createAuction, updateAuction} from "../actions/auctionActions";
import {usePathname, useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {Auction} from "@/types";

type Props = {
    auction?: Auction;
};

const AuctionForm = ({auction}: Props) => {
    const [imageUrl, setimageUrl] = useState<string | null>(null);
    const queryClient = useQueryClient();
    const router = useRouter();
    const pathname = usePathname();
    const {
        handleSubmit,
        control,
        setFocus,
        reset,
        formState: {isSubmitting, isValid},
    } = useForm({
        mode: "onTouched",
    });
    useEffect(() => {
        if (auction) {
            const {make, model, color, mileage, year} = auction;
            reset({make, model, color, mileage, year});
        }
        setFocus("make");
    }, [setFocus, auction, reset]);

    const {mutate: create, isPending: loading} = useMutation({
        mutationFn: createAuction,
        onSuccess: (res) => {
            queryClient.setQueryData(["auctions", res.id], res);
            if (res.error) {
                console.log(res.error);
                toast.error(res.error.status + " : " + res.error.message);
            } else {
                toast.success("Successfully Created!");
                router.push(`/auctions/details/${res.id}`);
            }
        },
    });
    const {mutate: update, isPending} = useMutation({
        mutationFn: updateAuction,
        onSuccess: (res) => {
            if (res.error) {
                console.log(res.error);
                toast.error(res.error.status + " : " + res.error.message);
            } else {
                toast.success("Successfully Updated!");
                router.push(`/auctions/details/${auction?.id}`);
            }
        },
    });

    const onSubmit = (data: FieldValues) => {
        if (imageUrl && pathname === "/auctions/create" && !auction) {
            create({...data, imageUrl});
        }
        if (pathname !== "/auctions/create" && auction) {
            update({id: auction.id, ...data, imageUrl});
        }
    };

    return (
        <form
            className=" flex flex-col mt-3 gap-3"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Input
                label="Make"
                name="make"
                control={control}
                rules={{required: "Make is required"}}
            />
            <Input
                label="Model"
                name="model"
                control={control}
                rules={{required: "Model is required"}}
            />
            <Input
                label="Color"
                name="color"
                control={control}
                rules={{required: "Color is required"}}
            />
            <div className=" gap-2 grid grid-cols-2">
                <Input
                    label="Year"
                    name="year"
                    control={control}
                    type="number"
                    rules={{required: "Year is required"}}
                />
                <Input
                    label="Mileage"
                    name="mileage"
                    control={control}
                    type="number"
                    rules={{required: "Mileage is required"}}
                />
            </div>
            {pathname === "/auctions/create" && (
                <div>
                    <UploadDropzone
                        className=" ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300"
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                            setimageUrl(res[0].url);
                        }}
                        onUploadError={(error: Error) => {
                            alert(`ERROR! ${error.message}`);
                        }}
                    />
                    {!imageUrl ? (
                        <div role="alert" className="alert">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="stroke-info shrink-0 w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            </svg>
                            <span>
                The image is required please upload an image or you cant sell
                your car (Try to use a 16:9 video size image to get more sales)
              </span>
                        </div>
                    ) : (
                        <div role="alert" className="alert alert-success">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="stroke-current shrink-0 h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>You are good to Go !!</span>
                        </div>
                    )}
                    <div className=" gap-2 grid grid-cols-2">
                        <Input
                            label="Reserve Price"
                            name="reservePrice"
                            control={control}
                            type="number"
                            rules={{required: "Reserve Price is required"}}
                        />
                        <DateInput
                            label="Auction End date/time"
                            name="auctionEnd"
                            control={control}
                            dateFormat="dd MMMM YYYY h:mm a"
                            showTimeSelect
                            rules={{required: "Auction End is required"}}
                        />
                    </div>
                </div>
            )}

            <div className=" flex justify-between">
                <button className="btn rounded-lg btn-outline btn-secondary" type="button" onClick={() => {

                    if (pathname === '/auctions/create') router.push('/');
                    else router.push(`/auctions/details/${auction?.id}`)
                }}>
                    Cancel
                </button>
                <button
                    disabled={isSubmitting || !isValid || isPending || loading}
                    type="submit"
                    className="btn btn-outline rounded-lg btn-success"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default AuctionForm;
