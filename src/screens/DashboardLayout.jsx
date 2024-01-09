import { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import SkooperSlider from "../Components/SkooperSlider";
import RestaurantSlider from "../Components/RestaurantSlider";
import CategoryModal from "../Components/Modals/CategoryModal";
import ProductModal from "../Components/Modals/ProductModal";
import DealModal from "../Components/Modals/DealModal";
import { currentRestaurant } from "../api/Api";
import InventoryModal from "../Components/Modals/InventoryModal";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [name, setName] = useState("")
  const [image, setImage] = useState("")
  // const customerView = true;
  // const customerData = useSelector((state) => state.customer.data)

  // console.log(customerView);
  // console.log(customerData);
  useEffect(() => {
    const getRestaurant = async () => {
      const data = JSON.parse(localStorage.getItem("restaurant"));
      if (data) {
        setName(data.restaurant_name);
        setImage(data.picture)
      }
      else{

        const response = await currentRestaurant();
        setName(response.restaurant_name);
        setImage(response.picture)
        localStorage.setItem("restaurant", JSON.stringify(response));
      }
    };
    getRestaurant();
  }, []);

  return (
    <div className="relative">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-background">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}  name={name} image={image}/>
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Outlet />
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}

      {/* Category Sidebar */}
      <CategoryModal />

      {/* Product Sidebar */}
      <ProductModal />

      {/* Deal Sidebar */}
      <DealModal />

      {/* Skooper Sidebar */}
      <SkooperSlider />

      {/* Restaurant Sidebar */}
      <RestaurantSlider />

      {/* Inventory Sidebar */}
      <InventoryModal />
    </div>
  );
};

export default DashboardLayout;