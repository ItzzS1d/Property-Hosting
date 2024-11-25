import Button from "./ui/Button";
import SearchIcon from "@mui/icons-material/Search";
import { VscAccount } from "react-icons/vsc";
import MenuIcon from "@mui/icons-material/Menu";
import { useModal } from "../contexts/ModelsContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { handleLogout } from "../lib/api-client";
const Navbar = () => {
  const { openLoginModal, openRegisterModal } = useModal();
  const [dropDownMenu, setDropDownMenu] = useState<boolean>(false);

  const { userInfo } = useAuth();
  const user = userInfo?.user;
  const handleDropDownMenu = () => {
    setDropDownMenu(!dropDownMenu);
  };

  return (
    <header className="py-3">
      <div className="flex items-center justify-around">
        <Button element="anchor" to="/">
          <img src="/assets/logo.png" alt="logo" width={150} />
        </Button>
        <form className="border-2 px-2 py-1.5 rounded-lg hidden md:block">
          <input type="text" placeholder="search..." className="outline-none" />
          <Button element="button">
            <SearchIcon color="action" />
          </Button>
        </form>
        <div className="flex items-center gap-5 relative">
          {user && <Link to={"/create-listing"}>Become A Host</Link>}
          <div
            className="border-2 border-gray-300 hover:border-gray-500 flex items-center p-2 rounded-full space-x-3 cursor-pointer transition-all ease-in-out hover:shadow-lg hover:bg-gray-100"
            onClick={handleDropDownMenu}
          >
            <MenuIcon color="action" />
            {user ? (
              <img
                src={user.profilePic}
                alt="User Avatar"
                width={30}
                height={30}
                className="rounded-full object-cover"
              />
            ) : (
              <VscAccount className="text-2xl text-gray-600" />
            )}
          </div>

          {/* dropdownmenu */}
          {dropDownMenu && !user && (
            <div
              className="absolute top-16 flex flex-col bg-white shadow-2xl   items-start pr-20 py-4 gap-2 pl-5 rounded-2xl z-50"
              onClick={handleDropDownMenu}
            >
              <button onClick={openLoginModal}>Login</button>
              <button onClick={openRegisterModal}>Register</button>
            </div>
          )}
          {dropDownMenu && user && (
            <div
              className="absolute top-16 flex flex-col bg-white shadow-2xl  items-start   pr-20 py-4 gap-2 pl-5 rounded-2xl whitespace-nowrap z-50"
              onClick={handleDropDownMenu}
            >
              <Link
                to={`/triplist?userId=${userInfo.user._id}`}
                className="text-gray-500 hover:text-black"
              >
                Trip List
              </Link>
              <Link
                to={`/wishlist?userId=${userInfo.user._id}`}
                className="text-gray-500 hover:text-black"
              >
                Wish List
              </Link>
              <Link
                to={`/properties?userId=${userInfo.user._id}`}
                className="text-gray-500 hover:text-black"
              >
                Property List
              </Link>
              <Link to={"#"} className="text-gray-500 hover:text-black">
                Reservation List
              </Link>
              <Link to={"#"} className="text-gray-500 hover:text-black">
                Become a Host
              </Link>
              <button
                className="text-gray-500 hover:text-black"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
