import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../redux/categorySlice";
import { addCategory, deleteCategory, updateCategory } from "../../api/Api";
import Spinner from "../Loader/Spinner";

const CategoryModal = () => {
  const [image, setimage] = useState();
  const [imageUrl, setimageUrl] = useState(null);
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const View = useSelector((state) => state.category.value);
  const data = useSelector((state) => state.category.data);


  useEffect(() => {
    if (Object.keys(data).length) {
      setimage(data.image);
      setname(data.title);
      setdescription(data.description);
    } else {
      setimage(null);
      setname("");
      setdescription("");
    }
  }, [data]);

  const handleAddCategory = async () => {
      if(!image) return seterror("Image is required");
      if(name.length === 0) return seterror("Name is required");
      if(name.length < 3) return seterror("Name must be atleast 3 characters long");
      if(description.length === 0) return seterror("Description is required");
      if(description.length < 10) return seterror("Description must be atleast 10 characters long");

      seterror("");
      try{
        setloading(true);
        await addCategory({title: name, description, image: imageUrl});
        setloading(false);
        window.location.reload();
        dispatch(setCategory(false))
      } 
      catch(err){
        console.log(err);
      }
  };

  const handleUpdateCategory = async () => {
    if(!image) return seterror("Image is required");
    if(name.length === 0) return seterror("Name is required");
    if(name.length < 3) return seterror("Name must be atleast 3 characters long");
    if(description.length === 0) return seterror("Description is required");
    if(description.length < 10) return seterror("Description must be atleast 10 characters long");
      seterror("");
      try{
        setloading(true);
        await updateCategory({title: name, description, image: imageUrl}, data._id);
        setloading(false);
        window.location.reload();
        dispatch(setCategory(false))
      } 
      catch(err){
        console.log(err);
      }
  };

  const handleDeleteCategory = async () => {
    try{
      setloading(true);
      await deleteCategory(data._id);
      setloading(false);
      window.location.reload();
      dispatch(setCategory(false))
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
        onClose={() => dispatch(setCategory(false))}
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
                    : "Add Category"}
                  <div
                    onClick={() => dispatch(setCategory(false))}
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
                    onClick={
                      Object.keys(data).length
                        ? handleUpdateCategory
                        : handleAddCategory
                    }
                  >
                    {loading ? <Spinner /> :
                    Object.keys(data).length
                      ? "Update Category"
                      : "Add Category"}
                  </button>
                </div>
                <div className="mt-2 flex w-full justify-center">
                  <button
                    className={`w-full rounded-lg bg-red-500 p-3 text-white ${
                      Object.keys(data).length ? "block" : "hidden"
                    }`}
                    onClick={handleDeleteCategory}
                  >
                    {loading ? <Spinner /> : "Delete Category"}
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

export default CategoryModal;
