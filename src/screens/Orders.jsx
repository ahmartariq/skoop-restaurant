import React, { useEffect, useState } from "react";
import FoodPic from "../assets/order.png";
import { useDispatch } from "react-redux";
import { setRestaurant, setRestaurantData } from "../redux/restaurantSlice";
import { getOrders, singleAddress, singleCustomer, singleFood } from "../api/Api";
import Loader from "../Components/Loader/Loader";

// const pastOrders = [
//   {
//     img: FoodPic,
//     id: "#123546421",
//     name: "Burger",
//     customer: "John Doe",
//     destination: "1234, Main Street, New York, USA",
//     deliveryTime: "10:00 AM",
//     specialInstructions: "No Onions",
//     items: ["Burger", "Fries", "Coke"],
//     price: 10.0,
//     status: "Pending",
//   },
//   {
//     img: FoodPic,
//     id: "#123546421",
//     name: "Burger",
//     customer: "John Doe",
//     destination: "1234, Main Street, New York, USA",
//     deliveryTime: "10:00 AM",
//     specialInstructions: "No Onions",
//     items: ["Burger", "Fries", "Coke"],
//     price: 10.0,
//     status: "Pending",
//   },
//   {
//     img: FoodPic,
//     id: "#123546421",
//     name: "Burger",
//     customer: "John Doe",
//     destination: "1234, Main Street, New York, USA",
//     deliveryTime: "10:00 AM",
//     specialInstructions: "No Onions",
//     items: ["Burger", "Fries", "Coke"],
//     price: 10.0,
//     status: "Pending",
//   },
//   {
//     img: FoodPic,
//     id: "#123546421",
//     name: "Burger",
//     customer: "John Doe",
//     destination: "1234, Main Street, New York, USA",
//     deliveryTime: "10:00 AM",
//     specialInstructions: "No Onions",
//     items: ["Burger", "Fries", "Coke"],
//     price: 10.0,
//     status: "Pending",
//   },
//   {
//     img: FoodPic,
//     id: "#123546421",
//     name: "Burger",
//     customer: "John Doe",
//     destination: "1234, Main Street, New York, USA",
//     deliveryTime: "10:00 AM",
//     specialInstructions: "No Onions",
//     items: ["Burger", "Fries", "Coke"],
//     price: 10.0,
//     status: "Pending",
//   },
//   {
//     img: FoodPic,
//     id: "#123546421",
//     name: "Burger",
//     customer: "John Doe",
//     destination: "1234, Main Street, New York, USA",
//     deliveryTime: "10:00 AM",
//     specialInstructions: "No Onions",
//     items: ["Burger", "Fries", "Coke"],
//     price: 10.0,
//     status: "Pending",
//   },
//   {
//     img: FoodPic,
//     id: "#123546421",
//     name: "Burger",
//     customer: "John Doe",
//     destination: "1234, Main Street, New York, USA",
//     deliveryTime: "10:00 AM",
//     specialInstructions: "No Onions",
//     items: ["Burger", "Fries", "Coke"],
//     price: 10.0,
//     status: "Pending",
//   },
// ];

const Orders = () => {
  const [selected, setSelected] = useState(0);
  const [pastOrders, setPastOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {

    const getItem = async (id) => {
      try {
        const imageRes = await singleFood(id); // Replace with your actual function to get base64 image by ID
        // if(!imageRes) return <img src={FoodPic} />
        const Example = `data:image/jpeg;base64,${imageRes.foodItem.image}`
        return { image: Example, name : imageRes.foodItem.name };
      } catch (error) {
        console.error(`Error fetching image for ID ${id}:`, error);
        return null;
      }
    };

    const orders = async () => {
      try {
        setLoading(true);
        const res = await getOrders(selected);
        const ordersWithImages = [];

        for (const order of res) {
          const product = await getItem(order.foodItems[0].item);
          const customerData = await singleCustomer(order.customer)
          const skooperData = await singleCustomer(order.scooper)
          const addressData = await singleAddress(order.address)
          ordersWithImages.push({ ...order, product, customerData, skooperData, addressData });
        }
        setPastOrders(ordersWithImages);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    orders();
  }, [selected]);


  return (
    <div className="flex w-full flex-col">
      {/* Top Area */}
      <div className="flex w-full flex-row">
        <div className="flex min-w-[450px] flex-row gap-x-2 rounded-md bg-white p-2">
          <div
            onClick={() => setSelected(0)}
            className={`cursor-pointer ${
              selected === 0
                ? "bg-primary font-bold text-white"
                : "bg-background font-semibold text-[#A1A5B7]"
            } flex w-1/2 items-center justify-center rounded-md py-3`}
          >
            Pending
          </div>
          <div
            onClick={() => setSelected(1)}
            className={`cursor-pointer ${
              selected === 1
                ? "bg-primary font-bold text-white"
                : "bg-background font-semibold text-[#A1A5B7]"
            } flex w-1/2 items-center justify-center rounded-md py-3`}
          >
            Prepared
          </div>
          <div
            onClick={() => setSelected(3)}
            className={`cursor-pointer ${
              selected === 3
                ? "bg-primary font-bold text-white"
                : "bg-background font-semibold text-[#A1A5B7]"
            } flex w-1/2 items-center justify-center rounded-md py-3`}
          >
            Picked Up
          </div>
          <div
            onClick={() => setSelected(4)}
            className={`cursor-pointer ${
              selected === 4
                ? "bg-primary font-bold text-white"
                : "bg-background font-semibold text-[#A1A5B7]"
            } flex w-1/2 items-center justify-center rounded-md py-3`}
          >
            Cancelled
          </div>
        </div>
      </div>

      <div className="mt-4 flex w-full flex-row flex-wrap gap-x-10 gap-y-4">
        {
        loading ? <Loader /> :
        pastOrders.length === 0 ? (
          <div className="flex justify-center w-full">

          <h1 className="text-[16px] font-semibold text-text">
            No Orders
          </h1>
          </div>
        ) : (
          pastOrders.map((order, index) => (
            <div
              key={index}
              onClick={() => {
                //   dispatch(setCustomer(true));
                //   dispatch(
                //     setCustomerData({
                //       restaurantName: order.foodItems[0].item.restaurant.restaurant_name,
                //       image: order.foodItems[0].item.image,
                //       skooper: order.scooper.full_name,
                //       id: order._id,
                //       items: order.foodItems,
                //       name: order.foodItems[0].item.name,
                //       instructions: order.special_instructions,
                //       location: order.address,
                //       price: order.total,
                //     }),
                dispatch(setRestaurant(true));
                dispatch(setRestaurantData(order));
              }}
              className="flex w-full cursor-pointer flex-row gap-4 rounded-[10px] p-2 md:w-[31%]"
              style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.10)" }}
            >
              <div className="flex w-[60%] items-center justify-center overflow-hidden rounded-[10px] md:h-auto md:w-[90px]">
                <img src={order.product.image} alt="" />
              </div>
              <div className="flex flex-col">
                <h2 className="mb-[3px] text-[16px] font-bold text-text">
                  {/* {order.foodItems[0].item.name} */}
                  {order.product.name}
                </h2>
                <p className="mb-2 text-xs font-normal text-[#AFAFAF]">
                  {/* {order.foodItems[0].item.restaurant.restaurant_name} */}
                  #{order._id}
                </p>
                <p className="text-[14px] font-bold text-text">
                  ${/* {order.total.toFixed(2)} */}
                  {order.total}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
