import Filters from "./auctions/Filters";
import Listings from "./auctions/Listings";
import AppPagination from "./components/AppPagination";

export default function Home() {
  return (
    <div className=" p-6 ">
      <Listings />
    </div>
  );
}
