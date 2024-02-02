import Search from "./Search";
import LogoReset from "./LogoReset";
import LoginButton from "./LoginButton";
import { getCurrentUser } from "../actions/authActions";
import UserActions from "./UserActions";

const NavBar = async () => {
  const user = await getCurrentUser();
  return (
    <div className="navbar flex shadow-md items-center z-50 top-0 bg-gray-100 sticky text-neutral-content justify-between">
      <LogoReset />
      <Search />
      {user ? <UserActions user={user} /> : <LoginButton />}
    </div>
  );
};

export default NavBar;
