import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FoodPic from "../assets/customerFood.png";
import { setRestaurant } from "../redux/restaurantSlice";
import { singleFood } from "../api/Api";

const RestaurantSlider = () => {
  const dispatch = useDispatch();
  const View = useSelector((state) => state.restaurant.value);
  const data = useSelector((state) => state.restaurant.data);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const allProducts = async () => {
      try{
        const pro = [];
        if (Object.keys(data).length === 0) {
          return
        }
        for (const id of data.foodItems) {
          const response = await singleFood(id.item);
          pro.push(response.foodItem);
        }

        setProducts(pro);
      }
      catch(err){
        console.log(err);
      }
    };
    allProducts();
  }, [data]);

  return (
    <div>
      <Transition appear show={View} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[40000] overflow-hidden"
          onClose={() => dispatch(setRestaurant(false))}
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
                  className={`absolute bottom-0 right-0 top-0 z-[30000] flex w-full flex-col overflow-hidden rounded-l-[10px] bg-white opacity-0 transition-all duration-300 ease-in-out sm:w-[461px] ${
                    View
                      ? "translate-x-0 opacity-100"
                      : "translate-x-[-100px] opacity-0"
                  }`}
                >
                  {/* Image */}
                  <div className="relative flex h-[20%] w-full items-center justify-center overflow-hidden bg-black">
                    <img src={data?.product?.image} alt="" />
                    <div
                      onClick={() => dispatch(setRestaurant(false))}
                      className="absolute left-5 top-5 flex h-[40px] w-[40px] cursor-pointer items-center  justify-center rounded-full bg-white"
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
                  </div>

                  {/* Content */}
                  <div className="mt-6 flex w-full justify-center">
                    <h1 className="text-3xl font-bold text-heading">
                      {data?.product?.name  }
                    </h1>
                  </div>

                  <div className="mt-4 flex flex-col gap-y-2 px-10">
                    <div className="flex flex-col items-start border-b border-b-[#AFAFAF] text-start">
                      <p className="text-sm font-semibold text-[#AFAFAF]">
                        Customer Name
                      </p>
                      <p className="text-base font-semibold text-text">
                       {data?.customerData?.full_name}
                      </p>
                    </div>
                    <div className="flex flex-col items-start border-b border-b-[#AFAFAF] text-start">
                      <p className="text-sm font-semibold text-[#AFAFAF]">
                      Order ID
                      </p>
                      <p className="text-base font-semibold text-text">
                        {data?._id}
                      </p>
                    </div>
                    <div className="flex flex-col items-start border-b border-b-[#AFAFAF] text-start">
                      <p className="text-sm font-semibold text-[#AFAFAF]">
                      Destination
                      </p>
                      <p className="text-base font-semibold text-text">
                        {data?.addressData?.address?.location_name?.length === 0 ? "No Destination " : data?.addressData?.address?.location_name}
                      </p>
                    </div>
                    <div className="flex flex-col items-start border-b border-b-[#AFAFAF] text-start">
                      <p className="text-sm font-semibold text-[#AFAFAF]">
                      Order Date
                      </p>
                      <p className="text-base font-semibold text-text">
                        {data?.createdAt?.split("T")[0]}
                      </p>
                    </div>
                    <div className="flex flex-col items-start border-b border-b-[#AFAFAF] text-start">
                      <p className="text-sm font-semibold text-[#AFAFAF]">
                        Ordered Items
                      </p>
                      <div className="flex flex-row gap-x-2 text-base font-semibold text-text">
                        {
                          products.length !== 0  &&
                          products.map((product) => (
                              <p key={product?._id} className="text-base font-semibold text-text">
                                {product?.name},
                              </p>
                          ))
                        }
                      </div>
                    </div>
                    <div className="flex flex-col items-start border-b border-b-[#AFAFAF] text-start">
                      <p className="text-sm font-semibold text-[#AFAFAF]">
                      Special Instructions
                      </p>
                      <p className="text-base font-semibold text-text">
                        {data?.special_instructions?.length === 0  ||  data?.special_instructions?.includes("\n")  ? "No Instructions" : data?.special_instructions}
                      </p>
                    </div>
                    {/* <div className="flex flex-col items-start border-b border-b-[#AFAFAF] text-start">
                      <p className="text-sm font-semibold text-[#AFAFAF]">
                      Order Details
                      </p>
                      <p className="text-base font-semibold text-text">
                        Please be quick..
                      </p>
                    </div> */}
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

export default RestaurantSlider;
