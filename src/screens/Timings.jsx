import { Switch } from "@headlessui/react";
import { useEffect, useState } from "react";
import { currentRestaurant, openingHours } from "../api/Api";
import Spinner from "../Components/Loader/Spinner";
import Loader from "../Components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";

const Timings = () => {
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [monday, setMonday] = useState({
    timeStart: "00:00",
    timeEnd: "00:00",
    availability: true,
    day: "monday",
  });
  const [tuesday, setTuesday] = useState({
    timeStart: "00:00",
    timeEnd: "00:00",
    availability: true,
    day: "tuesday",
  });
  const [wednesday, setWednesday] = useState({
    timeStart: "00:00",
    timeEnd: "00:00",
    availability: true,
    day: "wednesday",
  });
  const [thursday, setThursday] = useState({
    timeStart: "00:00",
    timeEnd: "00:00",
    availability: true,
    day: "thursday",
  });
  const [friday, setFriday] = useState({
    timeStart: "00:00",
    timeEnd: "00:00",
    availability: true,
    day: "friday",
  });
  const [saturday, setSaturday] = useState({
    timeStart: "00:00",
    timeEnd: "00:00",
    availability: true,
    day: "saturday",
  });
  const [sunday, setSunday] = useState({
    timeStart: "00:00",
    timeEnd: "00:00",
    availability: true,
    day: "sunday",
  });

  useEffect(() => {
    const getTimings = async () => {
      try {
        setPageLoading(true);
        const res = await currentRestaurant();
        console.log(res.opening_hours);
        setMonday(res.opening_hours[0]);
        setTuesday(res.opening_hours[1]);
        setWednesday(res.opening_hours[2]);
        setThursday(res.opening_hours[3]);
        setFriday(res.opening_hours[4]);
        setSaturday(res.opening_hours[5]);
        setSunday(res.opening_hours[6]);
        setPageLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getTimings();
  }, []);

  const handleTimings = async () => {
    setLoading(true);
    
    try {
      const arr = [
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
      ];
      await openingHours({ opening_hours: arr });
      setLoading(false);
      toast.success("Hours Update !", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex w-full justify-center">
      {pageLoading ? (
        <div className="flex w-full items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="flex w-full flex-col gap-y-3 md:w-[50%]">
          {/* Monday */}
          <div className="w-full rounded-lg bg-white px-2 py-4">
            <div className="flex w-full flex-row justify-between">
              <p className="pl-2">monday</p>

              <Switch
                availabilityed={monday?.availability}
                onChange={() =>
                  setMonday({ ...monday, availability: !monday?.availability })
                }
                className={`${
                  monday?.availability ? "bg-primary" : "bg-background"
                }
          relative inline-flex h-[19px] w-[37px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${
                    monday?.availability ? "translate-x-[18px]" : "translate-x-0"
                  }
            pointer-events-none inline-block h-[17px] w-[17px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            </div>
            <div className="mt-2 flex w-full flex-row gap-x-2">
              <input
                type="time"
                className="w-1/2 rounded-lg bg-background p-3 outline-none "
                placeholder="timeStart Time"
                value={monday?.timeStart}
                onChange={(e) =>
                  setMonday({ ...monday, timeStart: e.target.value })
                }
              />
              <input
                type="time"
                className="w-1/2 rounded-lg bg-background p-3 outline-none "
                placeholder="timeEnd Time"
                value={monday?.timeEnd}
                onChange={(e) =>
                  setMonday({ ...monday, timeEnd: e.target.value })
                }
              />
            </div>
          </div>

          {/* Tuesday */}
          <div className="w-full rounded-lg bg-white px-2 py-4">
            <div className="flex w-full flex-row justify-between">
              <p className="pl-2">Tuesday</p>

              <Switch
                availabilityed={tuesday?.availability}
                onChange={() =>
                  setTuesday({
                    ...tuesday,
                    availability: !tuesday?.availability,
                  })
                }
                className={`${
                  tuesday?.availability ? "bg-primary" : "bg-background"
                }
          relative inline-flex h-[19px] w-[37px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${
                    tuesday?.availability
                      ? "translate-x-[18px]"
                      : "translate-x-0"
                  }
            pointer-events-none inline-block h-[17px] w-[17px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            </div>
            <div className="mt-2 flex w-full flex-row gap-x-2">
              <input
                type="time"
                className="w-1/2 rounded-lg bg-background p-3 outline-none "
                placeholder="timeStart Time"
                value={tuesday?.timeStart}
                onChange={(e) =>
                  setTuesday({ ...tuesday, timeStart: e.target.value })
                }
              />
              <input
                type="time"
                className="w-1/2 rounded-lg bg-background p-3 outline-none "
                placeholder="timeEnd Time"
                value={tuesday?.timeEnd}
                onChange={(e) =>
                  setTuesday({ ...tuesday, timeEnd: e.target.value })
                }
              />
            </div>
          </div>

          {/* Wednesday */}
          <div className="w-full rounded-lg bg-white px-2 py-4">
            <div className="flex w-full flex-row justify-between">
              <p className="pl-2">Wednesday</p>

              <Switch
                availabilityed={wednesday?.availability}
                onChange={() =>
                  setWednesday({
                    ...wednesday,
                    availability: !wednesday?.availability,
                  })
                }
                className={`${
                  wednesday?.availability ? "bg-primary" : "bg-background"
                }
          relative inline-flex h-[19px] w-[37px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${
                    wednesday?.availability
                      ? "translate-x-[18px]"
                      : "translate-x-0"
                  }
            pointer-events-none inline-block h-[17px] w-[17px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            </div>
            <div className="mt-2 flex w-full flex-row gap-x-2">
              <input
                type="time"
                className="w-1/2 rounded-lg bg-background p-3 outline-none "
                placeholder="timeStart Time"
                value={wednesday?.timeStart}
                onChange={(e) =>
                  setWednesday({ ...wednesday, timeStart: e.target.value })
                }
              />
              <input
                type="time"
                className="w-1/2 rounded-lg bg-background p-3 outline-none "
                placeholder="timeEnd Time"
                value={wednesday?.timeEnd}
                onChange={(e) =>
                  setWednesday({ ...wednesday, timeEnd: e.target.value })
                }
              />
            </div>
          </div>

          {/* Thursday */}
          <div className="w-full rounded-lg bg-white px-2 py-4">
            <div className="flex w-full flex-row justify-between">
              <p className="pl-2">Thursday</p>

              <Switch
                availabilityed={thursday?.availability}
                onChange={() =>
                  setThursday({
                    ...thursday,
                    availability: !thursday?.availability,
                  })
                }
                className={`${
                  thursday?.availability ? "bg-primary" : "bg-background"
                }
          relative inline-flex h-[19px] w-[37px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${
                    thursday?.availability
                      ? "translate-x-[18px]"
                      : "translate-x-0"
                  }
            pointer-events-none inline-block h-[17px] w-[17px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            </div>
            <div className="mt-2 flex w-full flex-row gap-x-2">
              <input
                type="time"
                className="w-1/2 rounded-lg bg-background p-3 outline-none "
                placeholder="timeStart Time"
                value={thursday?.timeStart}
                onChange={(e) =>
                  setThursday({ ...thursday, timeStart: e.target.value })
                }
              />
              <input
                type="time"
                className="w-1/2 rounded-lg bg-background p-3 outline-none "
                placeholder="timeEnd Time"
                value={thursday?.timeEnd}
                onChange={(e) =>
                  setThursday({ ...thursday, timeEnd: e.target.value })
                }
              />
            </div>
          </div>

          {/* Friday */}
          <div className="w-full rounded-lg bg-white px-2 py-4">
            <div className="flex w-full flex-row justify-between">
              <p className="pl-2">Friday</p>

              <Switch
                availabilityed={friday?.availability}
                onChange={() =>
                  setFriday({ ...friday, availability: !friday?.availability })
                }
                className={`${
                  friday?.availability ? "bg-primary" : "bg-background"
                }
            relative inline-flex h-[19px] w-[37px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${
                    friday?.availability ? "translate-x-[18px]" : "translate-x-0"
                  }
                pointer-events-none inline-block h-[17px] w-[17px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            </div>
            <div className="mt-2 flex w-full flex-row gap-x-2">
              <input
                type="time"
                className="w-1/2 rounded-lg bg-background p-3 outline-none "
                placeholder="timeStart Time"
                value={friday?.timeStart}
                onChange={(e) =>
                  setFriday({ ...friday, timeStart: e.target.value })
                }
              />
              <input
                type="time"
                className="w-1/2 rounded-lg bg-background p-3 outline-none "
                placeholder="timeEnd Time"
                value={friday?.timeEnd}
                onChange={(e) =>
                  setFriday({ ...friday, timeEnd: e.target.value })
                }
              />
            </div>
          </div>

          {/* Saturday */}
          <div className="w-full rounded-lg bg-white px-2 py-4">
            <div className="flex w-full flex-row justify-between">
              <p className="pl-2">Saturday</p>

              <Switch
                availabilityed={saturday?.availability}
                onChange={() =>
                  setSaturday({
                    ...saturday,
                    availability: !saturday?.availability,
                  })
                }
                className={`${
                  saturday?.availability ? "bg-primary" : "bg-background"
                }
            relative inline-flex h-[19px] w-[37px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${
                    saturday?.availability
                      ? "translate-x-[18px]"
                      : "translate-x-0"
                  }
                pointer-events-none inline-block h-[17px] w-[17px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            </div>

            <div className="mt-2 flex w-full flex-row gap-x-2">
              <input
                type="time"
                className="w-1/2 rounded-lg bg-background p-3 outline-none "
                placeholder="timeStart Time"
                value={saturday?.timeStart}
                onChange={(e) =>
                  setSaturday({ ...saturday, timeStart: e.target.value })
                }
              />
              <input
                type="time"
                className="w-1/2 rounded-lg bg-background p-3 outline-none "
                placeholder="timeEnd Time"
                value={saturday?.timeEnd}
                onChange={(e) =>
                  setSaturday({ ...saturday, timeEnd: e.target.value })
                }
              />
            </div>
          </div>

          {/* Sunday */}
          <div className="w-full rounded-lg bg-white px-2 py-4">
            <div className="flex w-full flex-row justify-between">
              <p className="pl-2">Sunday</p>
              <Switch
                availabilityed={sunday?.availability}
                onChange={() =>
                  setSunday({ ...sunday, availability: !sunday?.availability })
                }
                className={`${
                  sunday?.availability ? "bg-primary" : "bg-background"
                }
            relative inline-flex h-[19px] w-[37px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${
                    sunday?.availability ? "translate-x-[18px]" : "translate-x-0"
                  }
                pointer-events-none inline-block h-[17px] w-[17px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            </div>
            <div className="mt-2 flex w-full flex-row gap-x-2">
              <input
                type="time"
                className="w-1/2 rounded-lg bg-background p-3 outline-none "
                placeholder="timeStart Time"
                value={sunday?.timeStart}
                onChange={(e) =>
                  setSunday({ ...sunday, timeStart: e.target.value })
                }
              />
              <input
                type="time"
                className="w-1/2 rounded-lg bg-background p-3 outline-none "
                placeholder="timeEnd Time"
                value={sunday?.timeEnd}
                onChange={(e) =>
                  setSunday({ ...sunday, timeEnd: e.target.value })
                }
              />
            </div>
          </div>
          <div className={`mt-4 flex w-full justify-center`}>
            <button
              className={`${loading ? "bg-secondary" : "bg-primary"} h-[60px] w-full rounded-[10px]  text-white`}
              onClick={loading ? null : handleTimings}
            >
              {loading ? <Spinner /> : "Update Profile"}
            </button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Timings;
