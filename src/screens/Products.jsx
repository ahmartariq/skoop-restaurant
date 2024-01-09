import { useEffect, useState } from "react";
import Loader from "../Components/Loader/Loader";
import FoodPic from "../assets/customerFood.png";
import { useDispatch } from "react-redux";
import { setCategory, setCategoryData } from "../redux/categorySlice";
import { setProduct, setProductData } from "../redux/productSlice";
import { getCategories, getFoods } from "../api/Api";

const Products = () => {
  const [search, setSearch] = useState("");
  const [search2, setSearch2] = useState("");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(true);
  const [categories, setCategories] = useState([]);
  const [searchedCategories, setSearchedCategories] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategory = async () => {
      try {
        setLoading(true);
        const res = await getCategories();
        setCategories(res.foodCategory);
        const res2 = await getFoods();
        setProducts(res2.foodItems);
        console.log(res2.foodItems);
        setSearchedCategories(res.foodCategory);
        setSearchedProducts(res2.foodItems);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
  }, []);

  useEffect(() => {
    if (search !== "") {
      const searched = categories.filter((category) =>
        category.title.toLowerCase().includes(search.toLowerCase()),
      );
      setSearchedCategories(searched);
    } else {
      setSearchedCategories(categories);
    }
  }, [search, categories]);

  useEffect(() => {
    if (search2 !== "") {
      const searched = products.filter((product) =>
        product.name.toLowerCase().includes(search2.toLowerCase()),
      );
      setSearchedProducts(searched);
    } else {
      setSearchedProducts(products);
    }
  }, [search2, products]);

  // base64 to image
  const Base64ToImage = (data) => {
    if (!data) return <img src={FoodPic} />;
    if(data.includes("data:image/")) return <img className="h-[250px] rounded-lg object-cover" src={data} />;
    const Example = <img className="h-[250px] rounded-lg object-cover" src={`data:image/jpeg;base64,${data}`} />;

    return Example;
  };

  return (
    <div className="flex w-full flex-col">
      {/* Top Area */}
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
            Category
          </div>
          <div
            onClick={() => setSelected(false)}
            className={`cursor-pointer ${
              !selected
                ? "bg-primary font-bold text-white"
                : "bg-background font-semibold text-[#A1A5B7]"
            } flex w-1/2 items-center justify-center rounded-md py-3`}
          >
            Product
          </div>
        </div>
      </div>

      {/* Category search */}
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
            placeholder="Search Category"
          />
        </label>
        <div className="flex flex-row gap-x-[18px]">
          <button
            onClick={() => dispatch(setCategory(true))}
            className="flex flex-row items-center justify-center gap-x-2 rounded-[10px] bg-primary px-4 py-2 text-base text-white"
          >
            ADD CATEGORY
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
      {/* Catogories */}
      <div
        className={`mt-4 flex w-[full] flex-row flex-wrap gap-6 ${
          selected ? "flex" : "hidden"
        }`}
      >
        {loading ? (
          <Loader />
        ) : searchedCategories.length === 0 ? (
          <div className="mt-5 flex w-full items-center justify-center">
            <p className="font-bold">No Categories Found</p>
          </div>
        ) : (
          searchedCategories.map((product, index) => (
            <div
              key={index}
              className="mx-auto mb-5 cursor-pointer sm:mx-0 sm:w-[49%] lg:w-[31%] xl:w-[23%] 2xl:w-[18%]"
              onClick={() => {
                dispatch(setCategory(true));
                dispatch(setCategoryData(product));
              }}
            >
              {Base64ToImage(product.image)}
              <p className="mt-2 text-center text-xl font-medium sm:text-start">
                {product.title}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Product search */}
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
            id="searchInput"
            value={search2}
            onChange={(e) => setSearch2(e.target.value)}
            className="w-[350px] bg-white text-[#868DA3] placeholder:text-[#AEB6CF] focus:outline-none "
            placeholder="Search Product"
          />
        </label>
        <div className="flex flex-row gap-x-[18px]">
          <button
            onClick={() => dispatch(setProduct(true))}
            className="flex flex-row items-center justify-center gap-x-2 rounded-[10px] bg-primary px-4 py-2 text-base text-white"
          >
            ADD PRODUCT
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
      {/* Products */}
      <div
        className={`mt-4 w-[full] flex-row flex-wrap gap-6 ${
          !selected ? "flex" : "hidden"
        }`}
      >
        {loading ? (
          <Loader />
        ) : searchedProducts.length === 0 ? (
          <div className="mt-5 flex w-full items-center justify-center">
            <p className="font-bold">No Products Found</p>
          </div>
        ) : (
          searchedProducts.map((product, index) => (
            <div
              key={index}
              className="mx-auto mb-5 cursor-pointer sm:mx-0 sm:w-[49%] lg:w-[31%] xl:w-[23%] 2xl:w-[18%]"
              onClick={() => {
                dispatch(setProduct(true));
                dispatch(setProductData(product));
              }}
            >
              {Base64ToImage(product.image)}

              <p className="mt-2 text-center text-xl font-medium sm:text-start">
                {product.name}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
