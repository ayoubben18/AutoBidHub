"use client";
import AuctionCard from "./AuctionCard";
import AppPagination from "../components/AppPagination";
import { getData } from "../actions/auctionActions";
import { useQuery } from "@tanstack/react-query";
import ListingSkeleton from "../skeletons/ListingSkeleton";
import Filters from "./Filters";
import { useParamsStore } from "@/hooks/useParamsStore";
import queryString from "query-string";
import { shallow } from "zustand/shallow";
import EmptyFilter from "../components/EmptyFilter";

const Listings = () => {
  const params = useParamsStore(
    (state) => ({
      pageNumber: state.pageNumber,
      pageSize: state.pageSize,
      searchTerm: state.searchTerm,
      orderBy: state.orderBy,
      filterBy: state.filterBy,
      seller: state.seller,
      winner: state.winner,
    }),
    shallow
  );
  const setParams = useParamsStore((state) => state.setParams);
  const url = queryString.stringifyUrl({
    url: "",
    query: params,
  });

  const setPageNumber = (pageNumber: number) => {
    setParams({ pageNumber });
  };
  const { data, isLoading } = useQuery({
    queryKey: ["auctions", url],
    queryFn: async () => await getData(url),
    retry: true,
  });

  if (isLoading) return <ListingSkeleton />;
  if (!data) return null;
  return (
    <div className="flex flex-col ">
      <Filters />
      {data.totalCount === 0 ? (
        <EmptyFilter showReset />
      ) : (
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {data &&
              data.result.map((auction) => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
          </div>
          <div className=" flex justify-center mt-4">
            <AppPagination
              currentPage={params.pageNumber}
              totalPages={data.pageCount}
              pageChanged={setPageNumber}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Listings;
