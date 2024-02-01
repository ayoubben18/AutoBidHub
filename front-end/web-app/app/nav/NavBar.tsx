import { PiCarSimpleThin } from "react-icons/pi";
import Search from "./Search";
import LogoReset from "./LogoReset";

const NavBar = () => {
  return (
    <div className="navbar flex shadow-md items-center z-50 top-0 bg-gray-100 sticky text-neutral-content justify-between">
      <LogoReset />
      <Search />
      <button className="btn btn-error btn-outline text-base">Login</button>
    </div>
  );
};

export default NavBar;
