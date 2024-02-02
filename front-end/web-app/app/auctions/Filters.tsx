import { useParamsStore } from "@/hooks/useParamsStore";
import { ButtonGroup } from "flowbite-react";
import { AiOutlineClockCircle, AiOutlineSortAscending } from "react-icons/ai";
import { BsFillStopCircleFill, BsStopwatchFill } from "react-icons/bs";
import { GiFinishLine, GiFlame } from "react-icons/gi";

const pageSizeButtons = [4, 8, 12];
const orderButtons = [
  { label: "Alphabetical", icon: AiOutlineSortAscending, value: "make" },
  { label: "End Date", icon: AiOutlineClockCircle, value: "endingSoon" },
  { label: "Recently Added", icon: BsFillStopCircleFill, value: "new" },
];
const filterButtons = [
  { label: "Live Auctions", icon: GiFlame, value: "make" },
  { label: "Finished", icon: BsStopwatchFill, value: "finished" },
  {
    label: "Ending Soon < 6hours",
    icon: GiFinishLine,
    value: "endingSoon",
  },
];
const Filters = () => {
  const { pageSize, setParams, orderBy, filterBy } = useParamsStore();
  return (
    <div className=" flex flex-wrap gap-6 items-center mb-4">
      <div>
        {" "}
        <span className=" uppercase text-sm text-gray-500 mr-2"> Order By</span>
        <ButtonGroup className="gap-x-1">
          {filterButtons.map(({ label, icon: Icon, value }) => (
            <button
              key={label}
              className={`btn btn-sm gap-1 text-white ${
                filterBy === value ? " btn-error " : " btn-outline btn-error "
              }`}
              onClick={() => setParams({ filterBy: value })}
            >
              <Icon />
              {label}
            </button>
          ))}
        </ButtonGroup>
      </div>
      <div>
        {" "}
        <span className=" uppercase text-sm text-gray-500 mr-2"> Order By</span>
        <ButtonGroup className="gap-x-1">
          {orderButtons.map(({ label, icon: Icon, value }) => (
            <button
              key={label}
              className={`btn btn-sm gap-1 text-white ${
                orderBy === value ? " btn-error " : " btn-outline btn-error "
              }`}
              onClick={() => setParams({ orderBy: value })}
            >
              <Icon />
              {label}
            </button>
          ))}
        </ButtonGroup>
      </div>
      <div>
        <span className=" uppercase text-sm text-gray-500 mr-2">Page Size</span>
        <ButtonGroup className="gap-x-1">
          {pageSizeButtons.map((value, index) => (
            <button
              className={`btn btn-square btn-sm ${
                pageSize === value ? " bg-black text-white" : "btn-outline"
              }`}
              key={index}
              onClick={() => setParams({ pageSize: value })}
            >
              {value}
            </button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
};

export default Filters;
