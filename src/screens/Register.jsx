import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { VerifyEmail } from "../api/Api";

const Register = () => {
  // States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isError, setIsError] = useState("");

  // selector
  const { loading } = useSelector((state) => state.user);

  // Redux
  const dispatch = useDispatch();

  // Navigate
  const navigate = useNavigate();

  // Handle Register
  const handleRegister = async () => {
    if (name === "") {
      setIsError("Please enter your restaurant name");
      return;
    }
    if (email === "") {
      setIsError("Please enter your email");
      return;
    }
    // reggex for email
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailformat)) {
      setIsError("Please enter a valid email");
      return;
    }

    if (number === "") {
      setIsError("Please enter your number");
      return;
    }
    if (number.length !== 11) {
      setIsError("Please enter a valid number");
      return;
    }
    // Reggex for number
    var phoneno = /^\d{11}$/;
    if (!number.match(phoneno)) {
      setIsError("Please enter a valid number");
      return;
    }
    if (password === "") {
      setIsError("Please enter your password");
      return;
    }
    if (confirmPassword === "") {
      setIsError("Please confirm your password");
      return;
    }
    if (password !== confirmPassword) {
      setIsError("Passwords do not match");
      return;
    }

    // try{
    //   const res = await RegisterApi({restaurant_name: name , email,phone_number: number, password});
    //   if(res.success === true){
    //     setIsError("");
    //     navigate("/login");
    //   }
    // }
    // catch(err){
    //   if(err.response.data.status === 409){
    //     setIsError("Email already exists");
    //     return;
    //   }

    //   console.log(err.response.data);
    // }

    try{
      const res = await VerifyEmail(email);
      if(res.success === true){
        setIsError("Email already exists");
      }
      else{
        navigate("/get-document", { state: { name, email, number, password } });
      }
    }
    catch(err){
      console.log(err);
    }

  };

  return (
    <div className="flex h-screen w-full flex-row flex-wrap">
      {/* Side View */}
      <div className="order-2 flex w-full flex-col items-center bg-sidebar py-5 sm:w-[40%] md:order-1 md:w-[30%] md:shadow-md">
        <h1 className="text-[35px] font-bold text-heading">Welcome Back!</h1>
        <p className="mt-[5px] px-20 text-center text-[15px] font-normal text-[#6C7278]">
          Please provide following details to register your restaurant
        </p>

        {/* Restaurant Name */}
        <div className="mt-[50px] flex w-full justify-center px-[40px]">
          <input
            type="text"
            className="h-[60px] w-full rounded-[10px] border border-[#AFAFAF] px-[30px] shadow-input focus:border-heading focus:outline-none active:outline-none"
            placeholder="Restaurant Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mt-[12px] flex w-full justify-center px-[40px]">
          <input
            type="email"
            className="h-[60px] w-full rounded-[10px] border border-[#AFAFAF] px-[30px] shadow-input focus:border-heading focus:outline-none active:outline-none"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Number */}
        <div className="mt-[12px] flex w-full justify-center px-[40px]">
          <input
            type="tel"
            className="h-[60px] w-full rounded-[10px] border border-[#AFAFAF] px-[30px] shadow-input focus:border-heading focus:outline-none active:outline-none"
            placeholder="Phone Number"
            name="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>

        {/* Passowrd */}
        <div className="mt-[12px] flex w-full justify-center px-[40px]">
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              className="h-[60px] w-full rounded-[10px] border border-[#AFAFAF] px-[30px] shadow-input focus:border-heading focus:outline-none active:outline-none"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              hidden={false}
            />
            <div
              className="absolute right-0 top-0 flex h-full cursor-pointer items-center justify-center pr-[22px]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? (
                <svg
                  width="28"
                  height="18"
                  viewBox="0 0 28 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M27.83 8.45C20.1374 -2.53655 7.82641 -2.493 0.169959 8.45025C0.0631809 8.61337 0.00547689 8.80371 0.00370422 8.99866C0.00193154 9.19361 0.0561647 9.38497 0.159959 9.55C7.83312 20.5365 20.2485 20.5038 27.84 9.53974C27.9437 9.37653 27.9979 9.18677 27.9962 8.99339C27.9944 8.80001 27.9367 8.61128 27.83 8.45ZM14 14.44C12.5576 14.4385 11.1748 13.8649 10.155 12.845C9.13509 11.8251 8.56146 10.4423 8.55996 9C8.81487 1.8 19.1861 1.80186 19.44 9.00009C19.4384 10.4424 18.8648 11.8252 17.8449 12.845C16.8251 13.8649 15.4423 14.4385 14 14.44Z"
                    fill="#CECECE"
                  />
                  <path
                    d="M14 5.56C13.0929 5.56789 12.2255 5.9338 11.5869 6.57808C10.9482 7.22235 10.5898 8.09283 10.5898 9.00003C10.5899 9.90723 10.9482 10.7777 11.5869 11.422C12.2256 12.0662 13.0929 12.4321 14.0001 12.44C14.9073 12.4321 15.7746 12.0662 16.4133 11.4219C17.052 10.7776 17.4103 9.90716 17.4103 8.99996C17.4103 8.09276 17.0519 7.22229 16.4132 6.57803C15.7745 5.93377 14.9072 5.56788 14 5.56Z"
                    fill="#CECECE"
                  />
                </svg>
              ) : (
                <svg
                  width="30"
                  height="22"
                  viewBox="0 0 30 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24.2928 0.2925L4.34577 20.2395C3.95577 20.6295 3.95577 21.2625 4.34577 21.6535C4.73677 22.0435 5.36977 22.0435 5.75977 21.6535L25.7068 1.7065C26.0968 1.3165 26.0968 0.6825 25.7068 0.2925C25.3168 -0.0975 24.6828 -0.0975 24.2928 0.2925ZM23.8578 4.9695L19.6548 9.1725C19.8778 9.7385 19.9998 10.3545 19.9998 10.9995C19.9998 13.7595 17.7598 15.9995 14.9998 15.9995C14.3548 15.9995 13.7388 15.8775 13.1728 15.6545L10.2148 18.6125C11.7168 19.1575 13.3268 19.4995 14.9998 19.4995C23.1418 19.4995 29.7768 11.3925 29.7768 11.3925C30.0738 11.0255 30.0738 10.5005 29.7768 10.1335C29.7768 10.1335 27.4478 7.2885 23.8578 4.9695ZM6.43076 16.7405L10.3448 12.8265C10.1218 12.2605 9.99976 11.6445 9.99976 10.9995C9.99976 8.2395 12.2398 5.9995 14.9998 5.9995C15.6448 5.9995 16.2608 6.1215 16.8268 6.3445L20.1288 3.0425C18.5298 2.4235 16.8018 2.02649 14.9998 2.02649C6.85776 2.02649 0.22275 10.1335 0.22275 10.1335C-0.07425 10.5005 -0.07425 11.0255 0.22275 11.3925C0.22275 11.3925 2.67676 14.3905 6.43076 16.7405ZM17.9948 10.8325C17.9978 10.8875 17.9998 10.9435 17.9998 10.9995C17.9998 12.6555 16.6558 13.9995 14.9998 13.9995C14.9438 13.9995 14.8878 13.9975 14.8328 13.9945L17.9948 10.8325ZM12.0048 11.1665C12.0018 11.1115 11.9998 11.0555 11.9998 10.9995C11.9998 9.3435 13.3438 7.9995 14.9998 7.9995C15.0558 7.9995 15.1117 8.00151 15.1667 8.00451L12.0048 11.1665Z"
                    fill="#CECECE"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Confirm Passowrd */}
        <div className="mt-[12px] flex w-full justify-center px-[40px]">
          <div className="relative w-full">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="h-[60px] w-full rounded-[10px] border border-[#AFAFAF] px-[30px] shadow-input focus:border-heading focus:outline-none active:outline-none"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              hidden={false}
            />
            <div
              className="absolute right-0 top-0 flex h-full cursor-pointer items-center justify-center pr-[22px]"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {!showConfirmPassword ? (
                <svg
                  width="28"
                  height="18"
                  viewBox="0 0 28 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M27.83 8.45C20.1374 -2.53655 7.82641 -2.493 0.169959 8.45025C0.0631809 8.61337 0.00547689 8.80371 0.00370422 8.99866C0.00193154 9.19361 0.0561647 9.38497 0.159959 9.55C7.83312 20.5365 20.2485 20.5038 27.84 9.53974C27.9437 9.37653 27.9979 9.18677 27.9962 8.99339C27.9944 8.80001 27.9367 8.61128 27.83 8.45ZM14 14.44C12.5576 14.4385 11.1748 13.8649 10.155 12.845C9.13509 11.8251 8.56146 10.4423 8.55996 9C8.81487 1.8 19.1861 1.80186 19.44 9.00009C19.4384 10.4424 18.8648 11.8252 17.8449 12.845C16.8251 13.8649 15.4423 14.4385 14 14.44Z"
                    fill="#CECECE"
                  />
                  <path
                    d="M14 5.56C13.0929 5.56789 12.2255 5.9338 11.5869 6.57808C10.9482 7.22235 10.5898 8.09283 10.5898 9.00003C10.5899 9.90723 10.9482 10.7777 11.5869 11.422C12.2256 12.0662 13.0929 12.4321 14.0001 12.44C14.9073 12.4321 15.7746 12.0662 16.4133 11.4219C17.052 10.7776 17.4103 9.90716 17.4103 8.99996C17.4103 8.09276 17.0519 7.22229 16.4132 6.57803C15.7745 5.93377 14.9072 5.56788 14 5.56Z"
                    fill="#CECECE"
                  />
                </svg>
              ) : (
                <svg
                  width="30"
                  height="22"
                  viewBox="0 0 30 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24.2928 0.2925L4.34577 20.2395C3.95577 20.6295 3.95577 21.2625 4.34577 21.6535C4.73677 22.0435 5.36977 22.0435 5.75977 21.6535L25.7068 1.7065C26.0968 1.3165 26.0968 0.6825 25.7068 0.2925C25.3168 -0.0975 24.6828 -0.0975 24.2928 0.2925ZM23.8578 4.9695L19.6548 9.1725C19.8778 9.7385 19.9998 10.3545 19.9998 10.9995C19.9998 13.7595 17.7598 15.9995 14.9998 15.9995C14.3548 15.9995 13.7388 15.8775 13.1728 15.6545L10.2148 18.6125C11.7168 19.1575 13.3268 19.4995 14.9998 19.4995C23.1418 19.4995 29.7768 11.3925 29.7768 11.3925C30.0738 11.0255 30.0738 10.5005 29.7768 10.1335C29.7768 10.1335 27.4478 7.2885 23.8578 4.9695ZM6.43076 16.7405L10.3448 12.8265C10.1218 12.2605 9.99976 11.6445 9.99976 10.9995C9.99976 8.2395 12.2398 5.9995 14.9998 5.9995C15.6448 5.9995 16.2608 6.1215 16.8268 6.3445L20.1288 3.0425C18.5298 2.4235 16.8018 2.02649 14.9998 2.02649C6.85776 2.02649 0.22275 10.1335 0.22275 10.1335C-0.07425 10.5005 -0.07425 11.0255 0.22275 11.3925C0.22275 11.3925 2.67676 14.3905 6.43076 16.7405ZM17.9948 10.8325C17.9978 10.8875 17.9998 10.9435 17.9998 10.9995C17.9998 12.6555 16.6558 13.9995 14.9998 13.9995C14.9438 13.9995 14.8878 13.9975 14.8328 13.9945L17.9948 10.8325ZM12.0048 11.1665C12.0018 11.1115 11.9998 11.0555 11.9998 10.9995C11.9998 9.3435 13.3438 7.9995 14.9998 7.9995C15.0558 7.9995 15.1117 8.00151 15.1667 8.00451L12.0048 11.1665Z"
                    fill="#CECECE"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Error */}
        <div className="mt-[12px] flex w-full px-[40px]">
          <p className="text-[12px] text-[#FF0000]">{isError}</p>
        </div>      

        {/* Register Button */}
        <div className="mt-[30px] flex w-full flex-col items-center justify-center px-[40px]">
          <button
            onClick={handleRegister}
            disabled={loading}
            className={` ${
              loading
                ? "bg-gray-200"
                : "bg-primary hover:bg-[#FFC656] active:bg-[#FFD583]"
            } h-[60px] w-full rounded-[10px] text-[15px] font-bold text-white `}
            style={{ transition: "0.3s" }}
          >
            Create Account
          </button>

          <p className="mt-4 cursor-pointer" onClick={() => navigate("/login")}>
            Already have an account?{" "}
            <span className="text-primary underline">Login</span>
          </p>
        </div>
      </div>

      {/* LOGO SPACE */}
      <div className="order-1 flex h-screen w-full items-center justify-center bg-background sm:w-[40%] md:order-2 md:w-[70%]">
        <h1 className="text-[100px] font-semibold">SKOOP</h1>
      </div>
    </div>
  );
};

export default Register;
