import Search from "./Search";
import LogoReset from "./LogoReset";
import LoginButton from "./LoginButton";
import {getCurrentUser} from "../actions/authActions";
import UserActions from "./UserActions";

const NavBar = async () => {
    const user = await getCurrentUser();
    return (
        <div className='shadow-md items-center z-50 top-0 bg-gray-100 sticky text-neutral-content'>
            <div
                className="navbar  flex justify-between">
                <LogoReset/>
                <div className='sm:block hidden px-4'><Search/></div>
                {user ? <UserActions user={user}/> : <LoginButton/>}
            </div>
            <div className='sm:hidden px-2 py-2 '><Search/></div>
        </div>

    );
};

export default NavBar;
