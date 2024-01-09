import React, { useEffect, useState } from "react";
import { currentRestaurant, updateProfile } from "../api/Api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Components/Loader/Spinner";
// import FoodPic from "../assets/user.png";

const Profile = () => {
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [imageUrl, setimageUrl] = useState("");

  useEffect(() => {
    const getRestaurant = async () => {
      try {
        const res = await currentRestaurant();
        setName(res.restaurant_name);
        setEmail(res.email);
        setPhone(res.phone_number);
        setDescription(res.description);
        setAddress(res.address);
        setImage(res.picture);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    getRestaurant();
  }, []);

  const handleEdit = async () => {
    try {
      setLoading(true);
      await updateProfile({
        restaurant_name: name,
        email,
        phone_number: phone,
        description,
        address,
        picture: imageUrl,
        category: "none",
      });
      setLoading(false);
      toast.success("Profile Update !", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      const res = await currentRestaurant();
      setName(res.restaurant_name);
      setEmail(res.email);
      setPhone(res.phone_number);
      setDescription(res.description);
      setAddress(res.address);
      setImage(res.picture);
      setEdit(false);
    } catch (err) {
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
      setImage(file);
    }
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full items-center justify-center">
        <div className="relative flex w-full items-center justify-center md:w-[50%]">
          {/* Edit Button */}
          <div className={`absolute right-0 top-0`}>
            {edit ? (
              <p
                className="cursor-pointer font-bold text-primary"
                onClick={() => setEdit(false)}
              >
                Cancel
              </p>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer text-[#48525B] transition-all duration-300 ease-in-out hover:text-primary"
                onClick={() => setEdit(true)}
              >
                <path
                  d="M14.2811 3.074C15.1008 2.18589 15.5106 1.74184 15.9462 1.48282C16.997 0.857835 18.291 0.8384 19.3594 1.43155C19.8022 1.67738 20.2246 2.10893 21.0695 2.97204C21.9144 3.83514 22.3369 4.2667 22.5775 4.71902C23.1582 5.81043 23.1392 7.13227 22.5274 8.20577C22.2738 8.65067 21.8391 9.06935 20.9697 9.90671L10.6257 19.8697C8.97816 21.4566 8.1544 22.25 7.12487 22.6521C6.09533 23.0542 4.96352 23.0246 2.6999 22.9654L2.39192 22.9574C1.7028 22.9394 1.35824 22.9304 1.15794 22.7031C0.957653 22.4757 0.984998 22.1248 1.03969 21.4228L1.06938 21.0416C1.22331 19.0659 1.30027 18.078 1.68608 17.19C2.07188 16.302 2.73738 15.581 4.06837 14.139L14.2811 3.074Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.1001 3.19995L20.8001 10.9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.2002 23L23.0002 23"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          {/* image */}
          <label
            className={`flex h-[200px] w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-cover bg-center ${
              !image ? "border-2 border-dashed" : ""
            }`}
          >
            {image ? (
              <img
                src={image instanceof File ? URL.createObjectURL(image) : image}
                className="h-full w-full object-cover"
              />
            ) : (
              <p>Upload Image</p>
            )}
            {edit && (
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
            )}
          </label>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        {/* Name */}
        <div className="mt-4 w-full md:w-[50%]">
          <input
            type="text"
            className="h-[60px] w-full rounded-[10px] border border-[#AFAFAF] px-[30px] shadow-input focus:border-heading focus:outline-none active:outline-none"
            placeholder="Name"
            value={name}
            readOnly={!edit}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mt-4 w-full md:w-[50%]">
          <input
            type="email"
            className="h-[60px] w-full rounded-[10px] border border-[#AFAFAF] px-[30px] shadow-input focus:border-heading focus:outline-none active:outline-none"
            placeholder="Email"
            value={email}
            readOnly={!edit}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Phone */}
        <div className="mt-4 w-full md:w-[50%]">
          <input
            type="number"
            className="h-[60px] w-full rounded-[10px] border border-[#AFAFAF] px-[30px] shadow-input focus:border-heading focus:outline-none active:outline-none"
            placeholder="Phone"
            value={phone}
            readOnly={!edit}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="mt-4 w-full md:w-[50%]">
          <textarea
            type="text"
            className=" w-full resize-none rounded-[10px] border border-[#AFAFAF] px-[30px] py-4 shadow-input focus:border-heading focus:outline-none active:outline-none"
            placeholder="Description"
            rows={6}
            value={description}
            readOnly={!edit}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Address */}
        <div className="mt-4 w-full md:w-[50%]">
          <textarea
            type="text"
            className="w-full resize-none rounded-[10px] border border-[#AFAFAF] px-[30px] py-4 shadow-input focus:border-heading focus:outline-none active:outline-none"
            placeholder="Address"
            rows={4}
            value={address}
            readOnly={!edit}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* Button */}
        <div
          className={`mt-4 w-full justify-center md:w-[50%] ${
            edit ? "flex" : "hidden"
          }`}
        >
          <button
            className={`${
              loading ? "bg-secondary" : "bg-primary"
            } h-[60px] w-full rounded-[10px]  text-white`}
            onClick={loading ? null : handleEdit}
          >
            {loading ? <Spinner /> : "Update Profile"}
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Profile;
