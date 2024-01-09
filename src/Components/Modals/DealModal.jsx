import { Fragment, useEffect, useState } from "react";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { setDeal } from "../../redux/dealSlice";
import { addDeal, deleteDeal, getFoods, updateDeal } from "../../api/Api";

const DealModal = () => {
  const [image, setimage] = useState();
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [options, setOptions] = useState([]);
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setimageUrl] = useState(null);
  const [error, seterror] = useState("");

  //   const [error, seterror] = useState(false);
  const dispatch = useDispatch();
  const View = useSelector((state) => state.deal.value);
  const data = useSelector((state) => state.deal.data);

  useEffect(() => {
    if (Object.keys(data).length) {
      setimage(data.images ? data.images[0] : null);
      setName(data.title);
      setPrice(data.price);
      setItems(data.food_items);
      setDate(data.date.split("T")[0]);
      setStartTime(data.starting_time);
      setEndTime(data.ending_time);
      setDescription(data.description);
    } else {
      setimage(null);
      setName("");
      setPrice("");
      setItems([]);
      setOptions([]);
      setDate("");
      setStartTime("");
      setEndTime("");
      setDescription("");
    }
  }, [data]);

  useEffect(() => {
    const getProucts = async () => {
      if(!View) return;
      try {
        const res = await getFoods();
        setOptions(res.foodItems);
      } catch (err) {
        console.log(err);
      }
    };
    getProucts();
  }, [View]);

  const handleAddDeal = async () => {
    try {

      if(!image) return seterror("Image is required");
      if(name.length === 0) return seterror("Name is required");
      if(name.length < 3) return seterror("Name must be atleast 3 characters long");
      if(items.length === 0) return seterror("Items are required");
      if(price.length === 0) return seterror("Price is required");
      if(date.length === 0) return seterror("Date is required");
      if(startTime.length === 0) return seterror("Start Time is required");
      if(endTime.length === 0) return seterror("End Time is required");
      if(description.length === 0) return seterror("Description is required");
      if(description.length < 10) return seterror("Description must be atleast 10 characters long");


      const itemsId = items.map((item) => item._id);
      const res = await addDeal({
        title: name,
        images: imageUrl,
        price,
        description,
        starting_time: startTime,
        ending_time: endTime,
        foodItems: itemsId,
        date,
      });
      window.location.reload();
      dispatch(setDeal(false));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateDeal = async () => {
    if (name && description && image) {
      seterror("");
      try {
        const itemsId = items.map((item) => item._id);
        await updateDeal(
          {
            title: name,
            images: imageUrl,
            price,
            description,
            starting_time: startTime,
            ending_time: endTime,
            food_items: itemsId,
            date,
          },
          data._id,
        );
        window.location.reload();
        dispatch(setDeal(false));
      } catch (err) {
        console.log(err);
      }
    } else {
      seterror(true);
    }
  };

  const handleDeleteDeal = async () => {
    try{
      await deleteDeal(data._id);
      window.location.reload();
      dispatch(setDeal(false))
    }
    catch(err){
      console.log(err);
    }
  };

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
        onClose={() => dispatch(setDeal(false))}
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
                  {Object.keys(data).length ? `Edit ${data.name}` : "Add Deal"}
                  <div
                    onClick={() => dispatch(setDeal(false))}
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

                {/* Image */}
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
                            : image
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

                {/* Name */}
                <div className="mt-2">
                  <input
                    type="text"
                    className="w-full rounded-lg bg-background p-3 outline-none"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* ITEMS */}
                <div className="mt-2">
                  <Listbox value={items} onChange={setItems} multiple>
                    <Listbox.Button
                      className={
                        "flex w-full items-center justify-between rounded-lg bg-background p-3 outline-none"
                      }
                    >
                      {items.length === 0
                        ? "Select Items"
                        : items.map((item) => item.name).join(", ")}
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
                      className={" flex flex-col gap-y-1 bg-background"}
                    >
                      {options.map((option) => (
                        <Listbox.Option
                          className={`cursor-pointer rounded-md  px-3 py-2 
                          ${
                            items.includes(option.name)
                              ? "bg-primary text-white hover:text-white"
                              : "bg-background"
                          } ${
                            option.name === "select options"
                              ? "text-gray-400"
                              : "text-gray-900 hover:text-primary"
                          }`}
                          key={option._id}
                          value={option}
                          disabled={option.name === "select options"}
                        >
                          {option.name}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Listbox>
                </div>

                {/* Price */}
                <div className="mt-2">
                  <input
                    type="text"
                    className="w-full rounded-lg bg-background p-3 outline-none "
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                {/* Date */}
                <div className="mt-2 flex w-full flex-row gap-x-2">
                  <input
                    type="date"
                    className="w-full rounded-lg bg-background p-3 outline-none "
                    placeholder="End Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                {/* Time */}
                <div className="mt-2 flex w-full flex-row gap-x-2">
                  <input
                    type="time"
                    className="w-1/2 rounded-lg bg-background p-3 outline-none "
                    placeholder="Start Time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                  <input
                    type="time"
                    className="w-1/2 rounded-lg bg-background p-3 outline-none "
                    placeholder="End Time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
                {/* Description */}
                <div className="mt-2">
                  <textarea
                    type="text"
                    className="w-full resize-none rounded-lg bg-background p-3 outline-none"
                    rows={7}
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="mt-4 flex w-full justify-center">
                  <button
                    className="w-full rounded-lg bg-primary p-3 text-white"
                    onClick={
                      Object.keys(data).length
                        ? handleUpdateDeal
                        : handleAddDeal
                    }
                  >
                    {Object.keys(data).length ? "Update Deal" : "Add Deal"}
                  </button>
                </div>
                <div className="mt-2 flex w-full justify-center">
                  <button
                    className={`w-full rounded-lg bg-red-500 p-3 text-white ${
                      Object.keys(data).length ? "block" : "hidden"
                    }`}
                    onClick={handleDeleteDeal}
                  >
                    Delete Deal
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

export default DealModal;
