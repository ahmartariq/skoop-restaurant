import { useLocation, useNavigate } from "react-router-dom";
import RestPic from "../assets/restaurant.png";
import OrderPic from "../assets/order.png";
import { setRestaurant, setRestaurantData } from "../redux/restaurantSlice";
import { useDispatch } from "react-redux";

const RestaurantDetails = () => {
  const {state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(state);
  return (
    <div className="flex w-full flex-col">
      {/* top info */}
      <div className="flex w-full flex-row justify-between">
        <div
          className="flex cursor-pointer flex-row items-center gap-x-3 p-1 text-text hover:text-[#AFAFAF]"
          onClick={() => navigate(-1)}
        >
          <svg
            width="7"
            height="11"
            viewBox="0 0 7 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 1L1 5.5L6 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h1 className="text-[21px] font-semibold">Information</h1>
        </div>
        <button className="flex flex-row items-center justify-center gap-x-2 rounded-[10px] bg-primary px-4 py-2 text-base text-white">
          Edit
        </button>
      </div>

      {/* info */}
      <div
        className="mt-8 flex h-auto w-full flex-col items-center gap-8 rounded-[10px] p-[18px] md:h-[180px] md:flex-row md:items-start"
        style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.10)" }}
      >
        <div className="flex h-[200px] w-[60%] items-center justify-center overflow-hidden rounded-[10px] md:h-[148px] md:w-[180px]">
          <img src={RestPic} alt="" className="w-full" />
        </div>
        <div className="flex flex-row gap-x-6 sm:gap-x-20 ">
          <div className="flex flex-col gap-y-5">
            <h1 className="text-xs font-semibold text-text sm:text-[16px]">
              Name:
            </h1>
            <h1 className="text-xs font-semibold text-text sm:text-[16px]">
              Email:
            </h1>
            <h1 className="text-xs font-semibold text-text sm:text-[16px]">
              Earnings:
            </h1>
            <h1 className="text-xs font-semibold text-text sm:text-[16px]">
              Rating:
            </h1>
          </div>
          <div className="flex flex-col gap-y-5">
            <h1 className="text-xs font-medium text-[#8388A2] sm:text-[16px]">
              {state.restaurant.restaurant_name === "" ? "N/A" : state.restaurant.restaurant_name}
            </h1>
            <h1 className="text-xs font-medium text-[#8388A2] sm:text-[16px]">
              {state.restaurant.email}
            </h1>
            <h1 className="text-xs font-medium text-[#8388A2] sm:text-[16px]">
              ${state.earnings.toFixed(2)}
            </h1>
            <h1 className="text-xs font-medium text-[#8388A2] sm:text-[16px]">
              {state.rating.toFixed(1)}
            </h1>
          </div>
        </div>
        <div className="flex flex-row gap-x-6 sm:gap-x-20 ">
          <div className="flex flex-col justify-between gap-y-5">
            <h1 className="text-xs font-semibold text-text sm:text-[16px]">
              Completed Orders:
            </h1>
            <h1 className="text-xs font-semibold text-text sm:text-[16px]">
              Uncompleted Orders:
            </h1>
            <h1 className="text-xs font-semibold text-text sm:text-[16px]">
              Reports:
            </h1>
            <h1 className="text-xs font-semibold text-text sm:text-[16px]">
              Account Status:
            </h1>
          </div>
          <div className="flex flex-col justify-between gap-y-5">
            <h1 className="text-xs font-medium text-[#8388A2] sm:text-[16px]">
              {state.restaurant.orders}
            </h1>
            <h1 className="text-xs font-medium text-[#8388A2] sm:text-[16px]">
              {state.restaurant.cancelled}
            </h1>
            <h1 className="text-xs font-medium text-[#8388A2] sm:text-[16px]">
              04
            </h1>
            <h1 className="text-xs font-medium text-[#8388A2] sm:text-[16px]">
              Not Restricted
            </h1>
          </div>
        </div>
      </div>

      {/* ORDERS AND REVIEWS */}

      <div className={`mt-10 flex w-full flex-row flex-wrap gap-y-4`}>
        {/* PAST ORDERS COMPLETED */}
        <div className="flex w-full flex-col gap-y-4 md:w-2/5 md:px-2">
          <h1 className="text-[21px] font-semibold text-text">Past Rides</h1>
          <div
            onClick={() => {
              dispatch(setRestaurant(true));
              dispatch(
                setRestaurantData({
                  name: "John Doe",
                  email: "hell@example.com",
                  id: 1,
                }),
              );
            }}
            className="flex w-full cursor-pointer flex-row gap-4 rounded-[10px] p-2"
            style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.10)" }}
          >
            <div className="flex w-[60%] items-center justify-center overflow-hidden rounded-[10px] md:h-auto md:w-[90px]">
              <img src={OrderPic} alt="" className="w-full" />
            </div>
            <div className="flex flex-col">
              <h2 className="mb-[3px] text-[16px] font-bold text-text">
                Flaming Pasta
              </h2>
              <p className="mb-2 text-xs font-normal text-[#AFAFAF]">
                Klippkroog
              </p>
              <p className="text-[14px] font-bold text-text">$27.00</p>
            </div>
          </div>
        </div>

        {/* PAST REVIEWS */}
        <div className="flex w-full flex-col gap-y-4 md:w-3/5 md:px-2">
          <h1 className="text-[21px] font-semibold text-text">Reviews</h1>
          <div
            className="flex w-full flex-col rounded-[10px] px-4 py-3"
            style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.10)" }}
          >
            <div className="flex flex-row gap-x-7">
              <p className="text-[15px] font-semibold text-[#AFAFAF]">
                Luis Jhons
              </p>
              <div className="flex flex-row items-center gap-x-1">
                {[...Array(4)].map((i) => (
                  <svg
                    key={i}
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.84112 0.842437L7.86767 2.91251C8.00766 3.20067 8.38095 3.47708 8.69592 3.53L10.5565 3.84169C11.7464 4.04164 12.0264 4.91201 11.169 5.77062L9.72247 7.22908C9.4775 7.47608 9.34334 7.95243 9.41917 8.29352L9.83329 10.099C10.1599 11.528 9.40751 12.0808 8.15348 11.3339L6.4095 10.293C6.09454 10.1048 5.57543 10.1048 5.25463 10.293L3.51066 11.3339C2.26246 12.0808 1.50421 11.5221 1.83084 10.099L2.24496 8.29352C2.32079 7.95243 2.18664 7.47608 1.94166 7.22908L0.495156 5.77062C-0.356417 4.91201 -0.0822801 4.04164 1.10759 3.84169L2.96822 3.53C3.27735 3.47708 3.65064 3.20067 3.79063 2.91251L4.81718 0.842437C5.37712 -0.280812 6.28702 -0.280812 6.84112 0.842437Z"
                      fill="#FDA800"
                    />
                  </svg>
                ))}
                {[...Array(1)].map((i) => (
                  <svg
                    key={i}
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.84112 0.842437L7.86767 2.91251C8.00766 3.20067 8.38095 3.47708 8.69592 3.53L10.5565 3.84169C11.7464 4.04164 12.0264 4.91201 11.169 5.77062L9.72247 7.22908C9.4775 7.47608 9.34334 7.95243 9.41917 8.29352L9.83329 10.099C10.1599 11.528 9.40751 12.0808 8.15348 11.3339L6.4095 10.293C6.09454 10.1048 5.57543 10.1048 5.25463 10.293L3.51066 11.3339C2.26246 12.0808 1.50421 11.5221 1.83084 10.099L2.24496 8.29352C2.32079 7.95243 2.18664 7.47608 1.94166 7.22908L0.495156 5.77062C-0.356417 4.91201 -0.0822801 4.04164 1.10759 3.84169L2.96822 3.53C3.27735 3.47708 3.65064 3.20067 3.79063 2.91251L4.81718 0.842437C5.37712 -0.280812 6.28702 -0.280812 6.84112 0.842437Z"
                      fill="#AFAFAF"
                    />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-base text-text">
              Amazing service! The delivery man was prompt, polite, and made
              sure my order was securely delivered. Highly recommend!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
