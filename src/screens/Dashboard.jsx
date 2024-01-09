import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Pic from ".././assets/profile.png";
import { dataLastWeek, getOrders, predictionApi } from "../api/Api";
import { useEffect, useState } from "react";

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

const Dashboard = () => {
  const [completedOrders, setCompletedOrders] = useState(0);
  const [mostOrders, setMostOrders] = useState({});
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [averageTime, setAverageTime] = useState(0);
  const [time, setTime] = useState(0);
  const [data, setData] = useState([
    {
      dayOfWeek: "Mon",
      count: 0,
    },
    {
      dayOfWeek: "Tue",
      count: 0,
    },
    {
      dayOfWeek: "Wed",
      count: 0,
    },
    {
      dayOfWeek: "Thu",
      count: 0,
    },
    {
      dayOfWeek: "Fri",
      count: 0,
    },
    {
      dayOfWeek: "Sat",
      count: 0,
    },
    {
      dayOfWeek: "Sun",
      count: 0,
    },
  ]);
  // const [newUsers, setNewUsers] = useState([]);

  useEffect(() => {
    const getWeek = async () => {
      try {
        const res = await dataLastWeek();
        const res2 = await getOrders(3);
        const id = JSON.parse(localStorage.getItem("restaurant"));
        const res3 = await predictionApi(id._id);
        setMostOrders(res3.data);
        let a = 0;
        for (const key in res3.data) {
          if (res3.data.hasOwnProperty(key)) {
            a += parseFloat(res3.data[key]);
          }
        }
        setTime(a);
        var c = 0;

        for (const count of res2) {
          c += count.total;
          const date = new Date(count.createdAt);
          const date2 = new Date(count.completeTime);
          const diffTime = Math.abs(date2 - date);
          setAverageTime(diffTime / 6000);
        }
        setTotalRevenue(c);
        setCompletedOrders(res2.length);
        if(res.result.length >= 0){
          return
        }
        setData(res.result);
      } catch (err) {
        console.log(err);
      }
    };
    getWeek();
  }, []);

  return (
    <div className="flex w-full flex-col">
      {/* TOP 3 boxes */}
      <div className="flex w-full flex-row flex-wrap justify-between gap-y-4">
        {/* Completed Orders */}
        <div
          className="flex h-[151px] w-full flex-col justify-between rounded-[10px] bg-white px-6 py-3 md:w-[24%]"
          style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.10)" }}
        >
          <p className="text-xl font-semibold text-text">Completed orders</p>
          <div className="mt-[2px] flex flex-row items-end gap-x-1">
            <h1 className="text-4xl font-semibold text-text">
              {completedOrders}
            </h1>
          </div>
          <p className="select-none text-sm font-medium text-transparent">
            Increase than last month
          </p>
        </div>

        {/* Sales */}
        <div
          className="flex h-[151px] w-full flex-col justify-between rounded-[10px] bg-white px-6 py-3 md:w-[24%]"
          style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.10)" }}
        >
          <p className="text-xl font-semibold text-text">Sales</p>
          <h1 className="mt-[2px] text-4xl font-semibold text-text">
            ${totalRevenue}
          </h1>

          <p className="text-sm font-medium text-[#AFAFAF]">
            Total revenue earned
          </p>
        </div>

        {/* RATING */}
        <div
          className="flex h-[151px] w-full flex-col justify-between rounded-[10px] bg-white px-6 py-3 md:w-[24%]"
          style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.10)" }}
        >
          <p className="text-xl font-semibold text-text">Average Time</p>
          <h1 className="mt-[2px] text-xl font-semibold text-text">
            {averageTime.toFixed(2)} mins
          </h1>

          <p className="text-sm font-medium text-[#AFAFAF]">
            Preparation - Delivery
          </p>
        </div>

        {/* extra */}
        <div
          className="flex h-[151px] w-full flex-col justify-between rounded-[10px] bg-white px-6 py-3 md:w-[24%]"
          style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.10)" }}
        >
          <p className="text-xl font-semibold text-text">Time of day</p>
          <h1 className="mt-[2px] text-4xl font-semibold text-text">{time}:00</h1>

          <p className="text-sm font-medium text-[#AFAFAF]">
            Time when get most orders
          </p>
        </div>
      </div>

      {/* Bar Graph */}
      <div className="mt-4 flex w-full flex-row gap-x-4">
        <div
          className="flex w-[75%] flex-col rounded-[10px] bg-white px-[34px] py-3"
          style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.10)" }}
        >
          <div className="flex w-[75%] flex-col">
            <p className="text-xl font-semibold text-text">
              Orders in Last Week
            </p>
          </div>
          <div className="mt-4 h-[300px] w-[full]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={200}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="dayOfWeek" axisLine={false} tickLine={false} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: 12 }}
                />
                <Tooltip cursor={{ fill: "transparent" }} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FDA800" />
                    <stop offset="100%" stopColor="#2A353D" />
                  </linearGradient>
                </defs>
                <Bar
                  dataKey="count"
                  radius={[20, 20, 20, 20]}
                  fill="url(#barGradient)"
                  background={{ fill: "#EFEFEF" }}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div
          className="flex w-[25%] flex-col items-center rounded-lg bg-white p-4"
          style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.10)" }}
        >
          <h1 className="text-xl font-semibold">Top Products</h1>
          {Object.keys(mostOrders).length === 0 ? (
            <div className="w-full mt-[16px] h-[45px] text-sm text-text flex justify-center">
              <p className="font-normal">No Data Available.</p>
            </div>
          ) : (
            <table className="mt-[18px] w-full table-auto text-sm">
              <thead className="text-[#AFAFAF]">
                <tr>
                  <th className="w-1/4 text-start font-normal">#</th>
                  <th className="text-start font-normal">Name</th>
                  <th className="text-start font-normal">Order Time</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(mostOrders).map((key, index) => (
                  <tr
                    key={index + 1}
                    className="mt-[16px] h-[45px] text-sm text-text"
                  >
                    <td className="font-normal">{index + 1}</td>
                    <td className="font-normal">{key}</td>
                    <td className="font-normal">{mostOrders[key]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
