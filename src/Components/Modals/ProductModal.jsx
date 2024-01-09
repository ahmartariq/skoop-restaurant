import { Fragment, useEffect, useState } from "react";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../../redux/productSlice";
import { addFood, deleteFood, getCategories, getCategoryNames, updateFood } from "../../api/Api";
import Spinner from "../Loader/Spinner";

const ProductModal = () => {
  const [image, setimage] = useState();
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState({title: ""});
  const [categories, setcategories] = useState([]);
  const [imageUrl, setimageUrl] = useState(null);
  const [error, seterror] = useState("");
  const [loading, setLoading] = useState(false);

//   const [error, seterror] = useState(false);
  const dispatch = useDispatch();
  const View = useSelector((state) => state.product.value);
  const data = useSelector((state) => state.product.data);

  useEffect(() => {
    if (Object.keys(data).length) {
      setimage(data.image);
      setname(data.name);
      setprice(data.price);
      categories.filter((category) => {
        if(category._id === data.food_category){
          setcategory(category);
        }
      })
      seterror("");
      setdescription(data.description);
    }
    else{
      setimage(null);
      setname("");
      setprice("");
      setcategory({title: ""});
      setdescription("");
      seterror("");
    }
  }, [data, categories]);

  useEffect(() => {
    const getCategory = async () => {
      if(!View) return;
      try {
        const res = await getCategoryNames();
        setcategories(res.foodCategory);
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
  }, [View]);

  const handleAddProduct = async () => {
      if(!image) return seterror("Image is required");
      if(name.length === 0) return seterror("Name is required");
      if(name.length < 3) return seterror("Name must be atleast 3 characters long");
      if(category.title.length === 0) return seterror("Category is required");
      if(price.length === 0) return seterror("Price is required");
      if(description.length === 0) return seterror("Description is required");
      if(description.length < 10) return seterror("Description must be atleast 10 characters long");
      
      seterror("");
      try{
        setLoading(true);
        const res = await addFood({ name, price,  description, image: imageUrl, food_category: category._id});
        setLoading(false);
        window.location.reload();
        dispatch(setProduct(false))
      } 
      catch(err){
        console.log(err);
      }
   
  };

  const handleUpdateProduct = async () => {
    if (name && description && image) {
      seterror("");
      try{
        setLoading(true);
        await updateFood({name ,price, description, image: imageUrl, food_category: category._id}, data._id);
        setLoading(false);
        window.location.reload();
        dispatch(setProduct(false))
      } 
      catch(err){
        console.log(err);
      }
    } else {
      seterror(true);
    }
  }

  const handleDeleteCategory = async () => {
    try{
      setLoading(true);
      await deleteFood(data._id);
      setLoading(false);
      window.location.reload();
      dispatch(setProduct(false))
    }
    catch(err){
      console.log(err);
    }
  };
  

  // convert image to base64
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = function (e) {
        const dataURL = e.target.result;
        // Do something with the dataURL
        setimageUrl(dataURL);
      };

      fileReader.readAsDataURL(file);
      setimage(file);
    }
  };

  return (
    <Transition appear show={View} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[1000000000000]"
        onClose={() => dispatch(setProduct(false))}
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
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="flex flex-row items-center justify-between text-lg font-medium leading-6 text-gray-900"
                >
                  {Object.keys(data).length
                    ? `Edit ${data.name}`
                    : "Add Product"}
                  <div
                    onClick={() => dispatch(setProduct(false))}
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
                </Dialog.Title>
                <div className="mt-4">
                  <label
                    className={`flex cursor-pointer items-center justify-center overflow-hidden ${
                      !image ? "border border-dashed" : ""
                    } h-[300px] rounded-lg`}
                  >
                    {image ? (
                      <img
                        src={
                          image instanceof File
                            ? URL.createObjectURL(image)
                            : image.includes("data:image") ? image : `data:image/jpeg;base64,${image}`
                        }
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <p>Upload Image</p>
                    )}

                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    className="w-full rounded-lg bg-background p-3 outline-none"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <Listbox value={category} onChange={setcategory}>
                    <Listbox.Button
                      className={
                        "flex w-full items-center justify-between rounded-lg bg-background p-3 outline-none"
                      }
                    >
                      {category?.title !== "" ? category?.title : "Select Category"}
                      <svg
                        width="12"
                        height="7"
                        viewBox="0 0 12 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1L5.29289 5.29289C5.62623 5.62623 5.79289 5.79289 6 5.79289C6.20711 5.79289 6.37377 5.62623 6.70711 5.29289L11 1"
                          stroke="#48525B"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Listbox.Button>
                    <Listbox.Options
                      className={
                        " flex flex-col gap-y-1 bg-background"
                      }
                    >
                      {categories.map((option) => (
                        <Listbox.Option
                          className={`cursor-pointer rounded-md  py-2 px-3 
                          ${ option === category.title
                             ? "bg-primary text-white hover:text-white" : "bg-background"} ${
                            option === "select options"
                              ? "text-gray-400"
                              : "text-gray-900 hover:text-primary"
                          }`}
                          key={option._id}
                          value={option}
                          disabled={option.title === "select options"}
                        >
                          {option.title}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Listbox>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    className="w-full rounded-lg bg-background p-3 outline-none "
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setprice(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <textarea
                    type="text"
                    className="w-full resize-none rounded-lg bg-background p-3 outline-none"
                    rows={7}
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                  />
                </div>

                <div className="mt-4 flex w-full justify-center">
                  <button
                    className="w-full rounded-lg bg-primary p-3 text-white"
                    onClick={Object.keys(data).length ? handleUpdateProduct : handleAddProduct}
                  >
                    {
                      loading ? <Spinner /> :
                    Object.keys(data).length
                      ? "Update Product"
                      : "Add Product"}
                  </button>
                </div>
                <div className="mt-2 flex w-full justify-center">
                  <button
                    className={`w-full rounded-lg bg-red-500 p-3 text-white ${
                      Object.keys(data).length ? "block" : "hidden"
                    }`}
                    onClick={handleDeleteCategory}
                  >
                    {loading ? <Spinner /> : "Delete Product"}
                  </button>
                </div>
                <div className="mt-2 flex w-full justify-center">
                  <p className="text-red-500">{error}</p>
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProductModal;
