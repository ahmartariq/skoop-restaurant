import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSkooper } from "../redux/SkooperSlice";

const SkooperSlider = () => {
  const dispatch = useDispatch();
  const View = useSelector((state) => state.skooper.value);

  return (
    <div>
      <Transition appear show={View} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[40000] overflow-hidden"
          onClose={() => dispatch(setSkooper(false))}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto overflow-x-hidden">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-x-[100px]"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 translate-x-[100px]"
              >
                <div
                  className={`absolute bottom-0 right-0 top-0 z-[30000] flex w-full flex-col overflow-hidden rounded-l-[10px] bg-white px-5 pt-5 opacity-0 transition-all duration-300 ease-in-out sm:w-[461px] ${
                    View
                      ? "translate-x-0 opacity-100"
                      : "translate-x-[-100px] opacity-0"
                  }`}
                >
                  {/* Image */}
                  <div
                    onClick={() => dispatch(setSkooper(false))}
                    className="flex h-[40px] w-[40px] cursor-pointer items-center  justify-center rounded-full bg-white"
                    style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.10)" }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                        fill="#48525B"
                      />
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="flex w-full justify-center">
                    <h1 className="text-3xl font-bold text-heading">
                      Flaming Pasta
                    </h1>
                  </div>

                  <div className="mt-12 flex flex-col gap-y-5 px-5">
                    <div className="flex flex-col items-start border-b border-b-[#AFAFAF] text-start">
                      <p className="text-sm font-semibold text-[#AFAFAF]">
                        Restaurant Name
                      </p>
                      <p className="text-base font-semibold text-text">
                        Espresso Cafe
                      </p>
                    </div>
                    <div className="flex flex-col items-start border-b border-b-[#AFAFAF] text-start">
                      <p className="text-sm font-semibold text-[#AFAFAF]">
                        Customer Name
                      </p>
                      <p className="text-base font-semibold text-text">
                        Alixes Alba
                      </p>
                    </div>
                    <div className="flex flex-col items-start border-b border-b-[#AFAFAF] text-start">
                      <p className="text-sm font-semibold text-[#AFAFAF]">
                        Destination
                      </p>
                      <p className="text-base font-semibold text-text">
                        EE Department, Room 33
                      </p>
                    </div>
                    <div className="flex flex-col items-start border-b border-b-[#AFAFAF] text-start">
                      <p className="text-sm font-semibold text-[#AFAFAF]">
                        Order ID
                      </p>
                      <p className="text-base font-semibold text-text">
                        343243321
                      </p>
                    </div>
                    <div className="flex flex-col items-start border-b border-b-[#AFAFAF] text-start">
                      <p className="text-sm font-semibold text-[#AFAFAF]">
                        Ordered Items
                      </p>
                      <p className="text-base font-semibold text-text">
                        Flaming Pasta, Drink
                      </p>
                    </div>
                    <div className="flex flex-col items-start border-b border-b-[#AFAFAF] text-start">
                      <p className="text-sm font-semibold text-[#AFAFAF]">
                        Total Amount
                      </p>
                      <p className="text-base font-semibold text-text">
                        $30.00
                      </p>
                    </div>
                    <div className="flex flex-col items-start border-b border-b-[#AFAFAF] text-start">
                      <p className="text-sm font-semibold text-[#AFAFAF]">
                        Tip
                      </p>
                      <p className="text-base font-semibold text-text">
                        $10.00
                      </p>
                    </div>

                    <div className="flex flex-col items-start border-b border-b-[#AFAFAF] text-start">
                      <p className="text-sm font-semibold text-[#AFAFAF]">
                        Ride Time
                      </p>
                      <p className="text-base font-semibold text-text">
                        12 min
                      </p>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default SkooperSlider;
