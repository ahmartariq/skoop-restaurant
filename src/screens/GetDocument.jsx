import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../Components/Loader/Spinner";
import { RegisterApi } from "../api/Api";
import { API } from "../../Config";

const GetDocument = () => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleVerify = async () => {
    if (image === "") {
      setError("Please upload a document");
      return;
    }

    setLoading(true);
    setError("");
    let formData = new FormData();
    formData.append("images", image);
    axios
      .post("http://localhost:4000/image/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.status === 200) {
          axios
            .get(
              API + "/image/extract-text?imageUrl=" + res.data.data.imageUrl,
              {
                headers: {
                  "X-RapidAPI-Host": "ocr-extract-text.p.rapidapi.com",
                  "X-RapidAPI-Key":
                    "336bd2bbc4mshf469042c9d0c35bp199a5djsnaa5cf783c29e",
                },
              },
            )
            .then((res) => {
              const universityNameRegex = /University Name: (.+?),/;
              const restaurantNameRegex = /Restaurant Name: (.+?)\n/;

              const universityNameMatch = universityNameRegex.exec(
                res.data.text,
              );
              const restaurantNameMatch = restaurantNameRegex.exec(
                res.data.text,
              );

              const universityName = universityNameMatch
                ? universityNameMatch[1]
                : null;
              const restaurantName = restaurantNameMatch
                ? restaurantNameMatch[1]
                : null;

              if (
                restaurantName.toLowerCase() ===
                  location.state.name.toLowerCase() &&
                universityName.toLowerCase() === "university of miami"
              ) {
                setError("Verified");
                RegisterApi({
                  restaurant_name: location.state.name,
                  email: location.state.email,
                  phone_number: location.state.number,
                  password: location.state.password,
                })
                  .then((res) => {
                    navigate("/login");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                setError("not verified");
              }
              setLoading(false);
            })
            .catch((error) => {
              console.error(error.response.data.message);
            });
        }
      })
      .catch((error) => {
        console.error(error.response);
      });
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h1 className="text-[35px] font-bold text-heading">
        Verify your Document
      </h1>
      <p className="mb-40 mt-[5px] px-20 text-center text-[15px] font-normal text-[#6C7278]">
        Please upload your document to verify your identity{" "}
      </p>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button
        className={`mt-4 h-[60px] w-72 rounded-[10px] bg-primary text-[15px] font-bold text-white hover:bg-[#FFC656] active:bg-[#FFD583] `}
        style={{ transition: "0.3s" }}
        onClick={handleVerify}
      >
        {loading ? <Spinner /> : "Verify"}
      </button>

      <p
        className={`${
          error === "Verified" ? "text-green-500" : "text-red-500"
        } mt-4 text-[15px] font-bold`}
      >
        {error}
      </p>
    </div>
  );
};

export default GetDocument;
