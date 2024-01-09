import { useEffect, useState } from "react";
import { setDeal, setDealData } from "../redux/dealSlice";
import { useDispatch } from "react-redux";
import FoodPic from "../assets/customerFood.png";
import { getDeals } from "../api/Api";
import Loader from "../Components/Loader/Loader";

const Deals = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [AllDeals, setAllDeals] = useState([]);
  const [searchedDeals, setSearchedDeals] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const deals = async () => {
      try {
        setLoading(true);
        const res = await getDeals();
        setAllDeals(res);
        console.log(res);
        setSearchedDeals(res);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    deals();
  }, []);

  useEffect(() => {
    const searchDeals = () => {
      setSearchedDeals(
        AllDeals.filter((deal) =>
          deal.title.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    };
    searchDeals();
  }, [search, AllDeals]);

  return (
    <div className="flex w-full flex-col">
      {/* Deals search */}
      <div
        className={`mt-5 flex w-full flex-row flex-wrap justify-between gap-y-3`}
      >
        <label
          htmlFor="searchInput"
          className="flex h-[48px] flex-row items-center justify-start gap-x-6 rounded-lg bg-white px-3 text-[#AEB6CF] focus:outline-none"
          style={{
            boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.10)",
            cursor: "text",
          }}
        >
          <svg
            className="cursor-pointer"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
              stroke="#AEB6CF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 22L20 20"
              stroke="#AEB6CF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="text"
            id="searchInput" // Add an id to the input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[350px] bg-white text-[#868DA3] placeholder:text-[#AEB6CF] focus:outline-none "
            placeholder="Search Deal"
          />
        </label>
        <div className="flex flex-row gap-x-[18px]">
          <button
            onClick={() => dispatch(setDeal(true))}
            className="flex flex-row items-center justify-center gap-x-2 rounded-[10px] bg-primary px-4 py-2 text-base text-white"
          >
            ADD DEAL
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
                d="M14 8.31576H8V14H6V8.31576H0V6.42103H6V0.736816H8V6.42103H14V8.31576Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Deals */}
      <div className={`mt-4 flex w-[full] flex-row flex-wrap gap-6`}>
        {loading ? (
          <Loader />
        ) : searchedDeals.length === 0 ? (
          <div className="mt-5 flex w-full items-center justify-center">
            <p className="font-bold">No Deals Found</p>
          </div>
        ) : (
          searchedDeals.map((deal, index) => (
            <div
              key={index}
              className="mx-auto mb-5 cursor-pointer sm:mx-0 sm:w-[49%] lg:w-[31%] xl:w-[23%] 2xl:w-[18%]"
              onClick={() => {
                dispatch(setDeal(true));
                dispatch(setDealData(deal));
              }}
            >
              <img
                src={deal.images ? deal.images[0] : FoodPic}
                className="h-[250px] rounded-lg object-cover"
              />
              <p className="mt-2 text-center text-xl font-medium sm:text-start">
                {deal.title}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Deals;
