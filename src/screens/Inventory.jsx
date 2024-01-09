import React, { useEffect, useState } from "react";
import { singleIngredientCategory, singleVendor, viewInventory, viewMyInventoryOrders } from "../api/Api";
import { useDispatch } from "react-redux";
import { setInventory, setInventoryData } from "../redux/inventorySlice";
import {Pagination} from "../components/Pagination";
import FoodPic from "../assets/customerFood.png";
import Loader from "../Components/Loader/Loader";

const Inventory = () => {
  const [selected, setSelected] = useState(true);
  const [search, setSearch] = useState("");
  const [search2 , setSearch2] = useState("")
  const [allinventory, setAllInventory] = useState([]);
  const [myinventory, setMyInventory] = useState([]);
  const [searchedInventory, setSearchedInventory] = useState([]);
  const [searchedMyInventory, setSearchedMyInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalInventory, setTotalInventory] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(20);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const AllInventory = async () => {
      try {
        setLoading(true);
        const res = await viewInventory();
        const res2 = await viewMyInventoryOrders()
        setMyInventory(res2);
        setSearchedMyInventory(res2);
        console.log(res2);
        setTotalInventory(res.length);
        const inven = []
        for (const inventory of res) {
            const vendor = await singleVendor(inventory.vendor);
            const category = await singleIngredientCategory(inventory.stockProduct_category);
            inven.push({...inventory, user: vendor, category: category})
        }
        setAllInventory(inven);
        setSearchedInventory(inven);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    AllInventory();
  }, []);

  
  useEffect(() => {
    if (search !== "") {
      const searched = allinventory.filter((category) =>
        category.name.toLowerCase().includes(search.toLowerCase()),
      );
      setSearchedInventory(searched);
    } else {
      setSearchedInventory(allinventory);
    }
  }, [search, allinventory]);

  useEffect(() => {
    if (search2 !== "") {
      const searched = myinventory.filter((category) =>
        category.name.toLowerCase().includes(search2.toLowerCase()),
      );
      setSearchedMyInventory(searched);
    } else {
      setSearchedMyInventory(myinventory);
    }
  }, [search2, myinventory]);
  

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-row">
        <div className="flex min-w-[390px] flex-row gap-x-2 rounded-md bg-white p-2">
          <div
            onClick={() => setSelected(true)}
            className={`cursor-pointer ${
              selected
                ? "bg-primary font-bold text-white"
                : "bg-background font-semibold text-[#A1A5B7]"
            } flex w-1/2 items-center justify-center rounded-md py-3`}
          >
            All Inventory
          </div>
          <div
            onClick={() => setSelected(false)}
            className={`cursor-pointer ${
              !selected
                ? "bg-primary font-bold text-white"
                : "bg-background font-semibold text-[#A1A5B7]"
            } flex w-1/2 items-center justify-center rounded-md py-3`}
          >
            My Inventory
          </div>
        </div>
      </div>

      {/* All Inventory search */}
      <div
        className={`mt-5 w-full flex-row flex-wrap justify-between gap-y-3 ${
          selected ? "flex" : "hidden"
        }`}
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
            placeholder="Search Inventory"
          />
        </label>
      </div>

      {/* all inventory maped */}
      <div className={` mt-4 w-[full] overflow-x-auto ${
          selected ? "block" : "hidden"
        }`}>
        {
          loading ? <div className="flex justify-center items-center h-[300px]">
            <Loader />
          </div> :
            searchedInventory.length === 0 ? <div className="flex justify-center items-center h-[300px]">
                <p className="text-[#A1A5B7]">No Inventory Found</p>
            </div> :
        <>
        <table className="w-full table-auto bg-white text-[12px] font-normal text-text md:text-[14px]">
          <thead>
            <tr className="border-b-[3px] border-[#E4E4E4]">
              <th className="pb-[8px] pl-4 pt-[18px] text-left">Name</th>
              <th className="pb-[8px] pt-[18px] text-left">Category</th>
              <th className="pb-[8px] pt-[18px] text-left">Price</th>
              <th className="pb-[8px] pt-[18px] text-left">
                <p className="pr-1">Vendor Name</p>
              </th>
              <th className="pb-[8px] pt-[18px] text-left">Quantity</th>
              <th className="pb-[8px] pt-[18px] text-left">
                <p className="pr-1">Actions</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {
            searchedInventory.map((inventory, index) => (
              <tr
                key={index}
                // onClick={() =>}
                className="border-b-[1px] border-[#E4E4E4]"
              >
                
                <td className="font-medium py-3 pl-4">
                  <p className="px-1">{inventory.name}</p>
                </td>
                <td className="font-medium">
                  <p className="px-1">{inventory.category.title}</p>
                </td>
                <td className="font-medium">
                  <p className="pr-1">${inventory.price}</p>
                </td>
                <td className="font-medium">
                  <p className="pr-1">{inventory.user.name}</p>
                </td>
                <td className="font-medium">
                  <p className="pr-1">{inventory.quantity}</p>
                </td>
                <td>
                  <div className="flex flex-row gap-x-4 ">
                      <div
                      onClick={() => {
                        dispatch(setInventory(true));
                        dispatch(setInventoryData(inventory));
                      }} 
                      className="w-[80px] rounded-md bg-primary py-1 cursor-pointer hover:opacity-50 transition-all duration-300 ease-in-out">
                        <p className="text-white text-center py-1">Add</p>
                      </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          perPage={perPage}
          totalData={totalInventory}
          paginate={paginate}
          currentPage={currentPage}
        />
        </>
            }
      </div>

      {/* My Inventory search */}
      <div
        className={`mt-5 w-full flex-row flex-wrap justify-between gap-y-3 ${
          !selected ? "flex" : "hidden"
        }`}
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
            value={search2}
            onChange={(e) => setSearch2(e.target.value)}
            className="w-[350px] bg-white text-[#868DA3] placeholder:text-[#AEB6CF] focus:outline-none "
            placeholder="Search My Inventory"
          />
        </label>
      </div>

      {/* my inventory maped */}
      <div className={` mt-4 w-[full] overflow-x-auto ${
          !selected ? "block" : "hidden"
        }`}>
        {
          loading ? <div className="flex justify-center items-center h-[300px]">
            <Loader />
          </div> :
            searchedMyInventory.length === 0 ? <div className="flex justify-center items-center h-[300px]">
                <p className="text-[#A1A5B7]">No Inventory Found</p>
            </div> :
        <>
        <table className="w-full table-auto bg-white text-[12px] font-normal text-text md:text-[14px]">
          <thead>
            <tr className="border-b-[3px] border-[#E4E4E4]">
              <th className="pb-[8px] pl-4 pt-[18px] text-left">Name</th>
              <th className="pb-[8px] pt-[18px] text-left">Category</th>
              <th className="pb-[8px] pt-[18px] text-left">Price</th>
              <th className="pb-[8px] pt-[18px] text-left">
                <p className="pr-1">Vendor Name</p>
              </th>
              <th className="pb-[8px] pt-[18px] text-left">Quantity</th>
              <th className="pb-[8px] pt-[18px] text-left">My Quantity</th>

            </tr>
          </thead>
          <tbody>
            {
            searchedMyInventory.map((inventory, index) => (
              <tr
                key={index}
                // onClick={() =>}
                className="border-b-[1px] border-[#E4E4E4]"
              >
                
                <td className="font-medium py-3 pl-4">
                  <p className="px-1">{inventory.name}</p>
                </td>
                <td className="font-medium">
                  <p className="px-1">{inventory.category_name}</p>
                </td>
                <td className="font-medium">
                  <p className="pr-1">${inventory.price}</p>
                </td>
                <td className="font-medium">
                  <p className="pr-1">{inventory.vendor_name}</p>
                </td>
                <td className="font-medium">
                  <p className="pr-1">{inventory.stockProduct_quantity}</p>
                </td>
                <td className="font-medium">
                  <p className="pr-1">{inventory.quantity_added}</p>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          perPage={perPage}
          totalData={totalInventory}
          paginate={paginate}
          currentPage={currentPage}
        />
        </>
            }
      </div>
    </div>
  );
};

export default Inventory;
