import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setInventory } from '../../redux/inventorySlice';
import { placeInventoryOrder } from '../../api/Api';
import Spinner from '../Loader/Spinner';

const InventoryModal = () => {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [reqQuantity, setReqQuantity] = useState(0);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const View = useSelector((state) => state.inventory.value);
    const data = useSelector((state) => state.inventory.data);
    const dispatch = useDispatch();

    useEffect(() => {
        if (Object.keys(data).length) {
            setName(data.name);
            setQuantity(data.quantity);
        }
        else{
            setName("");
        }
    }, [data])

    const handleAddDeal = async () => {
      if(reqQuantity === 0) return setError("Please enter required quantity")

      if(reqQuantity < 0) return setError("Please enter valid quantity")

      if(reqQuantity > quantity) return setError("Required quantity cannot be greater than available quantity")

      setError("")
      try{
        setLoading(true);
        const res = await placeInventoryOrder({productId: data._id, quantity: reqQuantity})
        setLoading(false);
      }
      catch(error){
        console.log(error);
      }
    }

  return (
    <Transition appear show={View} as={Fragment}>
    <Dialog
      as="div"
      className="relative z-[1000000000000]"
      onClose={() => dispatch(setInventory(false))}
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
                Order Inventory
                <div
                  onClick={() => dispatch(setInventory(false))}
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

              {/* Name */}
              <div className="mt-2">
                <input
                  type="text"
                  className="w-full rounded-lg bg-background p-3 outline-none"
                  placeholder="Inventory Name"
                  value={name}
                  readOnly
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* quantity */}
              <div className="mt-2">
                <input
                  type="number"
                  className="w-full rounded-lg bg-background p-3 outline-none "
                  placeholder="Price"
                  value={quantity}
                  readOnly
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              {/* req quantity */}
              <div className="mt-2">
                <input
                  type="number"
                  className="w-full rounded-lg bg-background p-3 outline-none "
                  placeholder="Requested Amount"
                  value={reqQuantity}
                  onChange={(e) => setReqQuantity(e.target.value)}
                />
              </div>

              <div className="mt-4 flex w-full justify-center">
                <button
                  className="w-full rounded-lg bg-primary p-3 text-white"
                  onClick={handleAddDeal}
                >
                  {loading ? <Spinner /> : "Order Inventory"}
                </button>

              </div>
                {error && (
                  <p className="text-red-500 text-sm mt-2">{error}</p>
                )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
  )
}

export default InventoryModal
