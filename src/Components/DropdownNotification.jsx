import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <li className="relative">
      <div
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-[8px]"
        style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.10)" }}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        ref={trigger}
      >
        <div className="absolute w-2 h-2 bg-primary rounded-full top-3 right-3"></div>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.0201 2.90991C8.71009 2.90991 6.02009 5.59991 6.02009 8.90991V11.7999C6.02009 12.4099 5.76009 13.3399 5.45009 13.8599L4.30009 15.7699C3.59009 16.9499 4.08009 18.2599 5.38009 18.6999C9.69009 20.1399 14.3401 20.1399 18.6501 18.6999C19.8601 18.2999 20.3901 16.8699 19.7301 15.7699L18.5801 13.8599C18.2801 13.3399 18.0201 12.4099 18.0201 11.7999V8.90991C18.0201 5.60991 15.3201 2.90991 12.0201 2.90991Z"
            stroke="#48525B"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />
          <path
            d="M13.8699 3.19994C13.5599 3.10994 13.2399 3.03994 12.9099 2.99994C11.9499 2.87994 11.0299 2.94994 10.1699 3.19994C10.4599 2.45994 11.1799 1.93994 12.0199 1.93994C12.8599 1.93994 13.5799 2.45994 13.8699 3.19994Z"
            stroke="#48525B"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.02 19.0601C15.02 20.7101 13.67 22.0601 12.02 22.0601C11.2 22.0601 10.44 21.7201 9.90002 21.1801C9.36002 20.6401 9.02002 19.8801 9.02002 19.0601"
            stroke="#48525B"
            strokeWidth="1.5"
            strokeMiterlimit="10"
          />
        </svg>
      </div>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`sm:left-0 h-90 w-72 border-stroke shadow-md absolute mt-2.5 flex flex-col rounded-lg border bg-white right-0 sm:w-80 ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <div className="px-4 py-3">
          <h5 className="text-heading text-sm font-medium">Notification</h5>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto">
          <li>
            <Link
              className="border-gray-200 px-4 hover:bg-gray-100 flex flex-col gap-2 border-t py-3"
              to="#"
            >
              <p className="text-sm">
                <span>
                  Edit your information in a swipe
                </span>{" "}
                Sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim.
              </p>

              <p className="text-xs">12 May, 2025</p>
            </Link>
          </li>
          <li>
            <Link
              className="border-gray-200 px-4 hover:bg-gray-100 flex flex-col gap-2 border-t py-3"
              to="#"
            >
              <p className="text-sm">
                <span>
                  Edit your information in a swipe
                </span>{" "}
                Sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim.
              </p>

              <p className="text-xs">12 May, 2025</p>
            </Link>
          </li>
          <li>
            <Link
              className="border-gray-200 px-4 hover:bg-gray-100 flex flex-col gap-2 border-t py-3"
              to="#"
            >
              <p className="text-sm">
                <span>
                  Edit your information in a swipe
                </span>{" "}
                Sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim.
              </p>

              <p className="text-xs">12 May, 2025</p>
            </Link>
          </li>
          <li>
            <Link
              className="border-gray-200 px-4 hover:bg-gray-100 flex flex-col gap-2 border-t py-3"
              to="#"
            >
              <p className="text-sm">
                <span>
                  Edit your information in a swipe
                </span>{" "}
                Sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim.
              </p>

              <p className="text-xs">12 May, 2025</p>
            </Link>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default DropdownNotification;
