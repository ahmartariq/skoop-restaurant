import React, { useEffect, useState } from "react";
import {
  Legend,
  Line,
  LineChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { predictionApi } from "../api/Api";

const sortOptions = [
  { value: "hourly", label: "Hourly" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "3months", label: "3 Months" },
  { value: "6months", label: "6 Months" },
  { value: "yearly", label: "Yearly" },
];

const data = [
  {
    name: "8 AM",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "10 AM",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "12 PM",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "2 PM",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "4 PM",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "6 PM",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "8 PM",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const topRestaurants = [
  {
    name: "Espresso Cafe",
    orders: 320,
  },
  {
    name: "McDonalds",
    orders: 210,
  },
  {
    name: "Silver Spoon",
    orders: 190,
  },
  {
    name: "Al Madia",
    orders: 180,
  },
];

const circleData = [
  {
    name: "Restaurant",
    value: 3,
    fill: "#48525B",
  },
  {
    name: "Skooper",
    value: 4,
    fill: "#FDA800",
  },
  {
    name: "",
    value: 5,
    fill: "transparent",
  },
  
];

const Stats = () => {
  const [timeOfDay, setTimeOfDay] = useState({});

  useEffect(() => {
    const prediction = async () => {
      try{
        const id = JSON.parse(localStorage.getItem("restaurant"))
        const res = await predictionApi(id._id)
        setTimeOfDay(res.data);
      }
      catch(err){
        console.log(err)
      }
    }
    prediction()
  },[])

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-row justify-between">
        <h1 className="text-[20px] font-bold">Statistics</h1>
      </div>

      {/* First Row  */}
      <div className="mt-8 flex flex-row flex-wrap justify-between gap-y-4">
        <div
          className="flex w-full flex-col items-center rounded-lg bg-white p-4 sm:w-[24%]"
          style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.10)" }}
        >
          <h1 className="text-xl font-semibold text-text">
            Average Order Time
          </h1>
          <p className="text-xs text-[#AFAFAF]">
            Entire order from beginning to delivery
          </p>
          <h2 className="mt-4 text-[40px] font-semibold text-text">
            50<span className="text-[20px]">min</span>
          </h2>
        </div>
        <div
          className="flex w-full flex-col items-center rounded-lg bg-white p-4 sm:w-[24%]"
          style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.10)" }}
        >
          <h1 className="text-xl font-semibold text-text">
            Average Order Time
          </h1>
          <p className="text-xs text-[#AFAFAF]">
            Restaurant takes to prepare order
          </p>
          <h2 className="mt-4 text-[40px] font-semibold text-text">
            20<span className="text-[20px]">min</span>
          </h2>
        </div>
        <div
          className="flex w-full flex-col items-center rounded-lg bg-white p-4 sm:w-[24%]"
          style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.10)" }}
        >
          <h1 className="text-xl font-semibold text-text">
            Average Order Time
          </h1>
          <p className="text-xs text-[#AFAFAF]">
            Skooper takes to deliver an order
          </p>
          <h2 className="mt-4 text-[40px] font-semibold text-text">
            30<span className="text-[20px]">min</span>
          </h2>
        </div>
        <div
          className="flex w-full flex-col items-center rounded-lg bg-white p-4 sm:w-[24%]"
          style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.10)" }}
        >
          <h1 className="text-xl font-semibold text-text">
            Average Tip Amount
          </h1>
          <p className="text-xs text-[#AFAFAF]">Skooper get from rides</p>
          <h2 className="mt-4 text-[40px] font-semibold text-text">$13</h2>
        </div>
      </div>

      {/* Seond Row */}
      <div className="mt-4 flex w-full flex-row flex-wrap justify-between gap-y-4">
        <div
          className="h-[48 0px] flex w-full flex-col items-center rounded-lg bg-white p-4 sm:w-[74%]"
          style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.10)" }}
        >
          <h1 className="text-xl font-semibold text-text">Orders & Revenue</h1>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="top" height={36} iconType="plainline" />
              <Line
                type="monotone"
                strokeWidth={4}
                dataKey="pv"
                stroke="#48525B"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="uv"
                stroke="#FDA800"
                strokeWidth={4}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex w-full flex-row flex-wrap gap-4 sm:w-[24%]">
          <div
            className="flex w-full flex-col items-center rounded-lg bg-white p-4"
            style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.10)" }}
          >
            <h1 className="text-xl font-semibold">Top Restaurants</h1>
            <table className="mt-[18px] w-full table-auto text-sm">
              <thead className="text-[#AFAFAF]">
                <tr>
                  <th className="w-1/4 text-start font-normal">#</th>
                  <th className="text-start font-normal">Name</th>
                  <th className="text-start font-normal">Orders</th>
                </tr>
              </thead>
              <tbody>
                {topRestaurants.map((restaurant, index) => (
                  <tr
                    key={index + 1}
                    className="mt-[16px] h-[45px] text-sm text-text"
                  >
                    <td className="font-normal">{index + 1}</td>
                    <td className="font-normal">{restaurant.name}</td>
                    <td className="font-normal">{restaurant.orders}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            className="flex w-full flex-col items-center rounded-lg bg-white p-4"
            style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.10)" }}
          >
            <h1 className="text-xl font-semibold text-text">Success Rate</h1>
            <p className="text-sm text-[#AFAFAF]">Per Delivery</p>
            <h2 className="mt-2 text-[40px] font-semibold text-text">93%</h2>
          </div>
        </div>
      </div>

      {/* Third Row */}
      <div className="mt-8 flex flex-row flex-wrap justify-between gap-y-4">
        <div
          className="flex h-[270px] w-full flex-col items-center rounded-lg bg-white p-4 sm:w-[24%]"
          style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.10)" }}
        >
          <h1 className="text-xl font-semibold text-text">Time of Day</h1>
          <p className="mt-1 text-xs text-[#AFAFAF]">When Orders take</p>

          <div className="relative mt-3 flex h-[30px] w-[180px] flex-row rounded-full border border-text">
            <div
              onClick={() => setTimeOfDay(0)}
              className={`${
                timeOfDay === 0
                  ? "w-[70%] bg-primary text-white"
                  : "w-[70%] bg-transparent text-text"
              } flex h-full cursor-pointer items-center justify-center rounded-full`}
            >
              <p className="text-sm">Quickest</p>
            </div>
            <div
              onClick={() => setTimeOfDay(1)}
              className={`${
                timeOfDay === 1
                  ? "w-[70%] bg-primary text-white"
                  : "w-[70%] bg-transparent text-text"
              } flex h-full cursor-pointer items-center justify-center rounded-full  bg-primary`}
            >
              <p className="text-sm">Longest</p>
            </div>
          </div>
          <h2 className="mt-9 text-[35px] font-semibold text-text ">
            4PM - 6PM
          </h2>
        </div>
        <div
          className="flex w-full flex-col items-center rounded-lg bg-white p-4 sm:w-[24%]"
          style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.10)" }}
        >
          <h1 className="text-xl font-semibold text-text">Average Reports</h1>
          <p className="mt-1 text-xs text-[#AFAFAF]">Per Skooper</p>
          <h2 className="mt-16 text-[40px] font-semibold text-text">05</h2>
        </div>
        <div
          className="flex w-full flex-col items-center rounded-lg bg-white p-4 sm:w-[24%]"
          style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.10)" }}
        >
          <h1 className="text-xl font-semibold text-text">Average Cost</h1>
          <p className="mt-1 text-xs text-[#AFAFAF]">Per Order</p>
          <h2 className="mt-16 text-[40px] font-semibold text-text">$120</h2>
        </div>
        <div
          className="flex w-full flex-col items-center rounded-lg bg-white p-4 sm:w-[24%]"
          style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.10)" }}
        >
          <h1 className="text-xl font-semibold text-text">
            Average Tip Amount
          </h1>
          <ResponsiveContainer width="100%" height="70%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="100%"
              outerRadius="30%"

              barSize={10}
              data={circleData}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar
                minAngle={5}
                // background
                clockWise
                dataKey="value"
              />
              {/* <Legend iconSize={10} layout="vertical" verticalAlign="middle" /> */}
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="flex flex-row w-full">
              <div className="flex flex-row w-1/2 items-start gap-x-2 justify-center">
                  <div className="w-[10px] h-[10px] rounded-full bg-text mt-[7px]"></div>
                  <div className="flex flex-col">
                  <p className="text-[14px] font-normal text-[#AFAFAF]">Restaurants</p>
                  <p className="text-[16px] font-medium text-text">{circleData[0].value}</p>
                  </div>
              </div>
              <div className="flex flex-row w-1/2 items-start gap-x-2 justify-center">
                  <div className="w-[10px] h-[10px] rounded-full bg-primary mt-[7px]"></div>
                  <div className="flex flex-col">
                  <p className="text-[14px] font-normal text-[#AFAFAF]">Skoopers</p>
                  <p className="text-[16px] font-medium text-text">{circleData[1].value}</p>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
