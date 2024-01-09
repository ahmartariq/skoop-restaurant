import DropdownUser from "./DropdownUser";
import DropdownNotification from "./DropdownNotification";
import { Switch } from "@headlessui/react";
import { openCloseRestaurant } from "../api/Api";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const Header = ({ sidebarOpen, setSidebarOpen, name, image}) => {

  return (
    <header className="z-[30000] drop-shadow-1 sticky top-0 flex w-full bg-white">
      <div className="shadow-2 flex flex-grow items-center justify-between px-4 py-4 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-99999 border-stroke block rounded-sm border border-gray-300 bg-white p-1.5 shadow-sm lg:hidden"
          >
            <span className="relative block h-[22px] w-[22px] cursor-pointer">
              <span className="absolute right-0 block h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out ${
                    !sidebarOpen && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out ${
                    !sidebarOpen && "delay-400 !w-full"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out ${
                    !sidebarOpen && "!w-full delay-500"
                  }`}
                ></span>
              </span>

              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out ${
                    !sidebarOpen && "!h-0 !delay-[0]"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out ${
                    !sidebarOpen && "!h-0 !delay-200"
                  }`}
                ></span>
              </span>
            </span>
          </button>
        </div>

        <div className="flex flex-row items-center sm:gap-x-6 gap-x-1">
          <h1 className="sm:text-xl text-base font-semibold">Hello {name.toUpperCase()}</h1>
        </div>


        <div className="2xsm:gap-7 flex items-center gap-3">
          {/* <!-- User Area --> */}
         
          {/* <!-- User Area --> */}
        </div>
        <div className="2xsm:gap-7 flex items-center gap-3">
          {/* <!-- User Area --> */}
          
          <DropdownUser image={image}/>
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
