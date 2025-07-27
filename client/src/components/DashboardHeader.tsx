import React, { useContext } from "react";
import { GiMagicPalm } from "react-icons/gi";
import NotificationBell from "./NotificationBell";
import { FiChevronDown } from "react-icons/fi";
import SearchInput from "./SearchInput";
import { UserContext } from "../pages/Root";

const DashboardHeader: React.FC = () => {
  const currentUser = useContext(UserContext);
  return (
    <div>
      <div className="flex w-full justify-between align-center">
        <div>
          <div className="text-sm">
            <b className="flex">
              Hello, John Walker{" "}
              <GiMagicPalm className="text-secondary mt-1 ml-5" />
            </b>
            <p className="text-[0.6rem] tracking-widest">
              Welcome to LifeCare Online Hospital Dashboard
            </p>
          </div>
        </div>
        <div className="w-1/3">
          <SearchInput />
        </div>
        <div className="hidden lg:flex">
          <NotificationBell />
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar ml-10"
          >
            <div className="w-24 rounded-full">
              <img
                alt="profile image"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <div className="dropdown dropdown-end flex flex-col ml-2">
            <div tabIndex={0} role="button" className="flex align-center">
              <div className="text-xs mr-1">{currentUser?.name}</div>
              <FiChevronDown className="hover:bg-base-100" />
            </div>
            <small className="text-[0.6rem]">{currentUser?.role}</small>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-12 w-52 p-2 shadow"
            >
              <li>
                <a>Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
