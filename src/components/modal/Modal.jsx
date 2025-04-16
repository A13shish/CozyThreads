import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

// eslint-disable-next-line react/prop-types
export default function Modal({ name, address, pincode, phoneNumber, setName, setAddress, setPincode, setPhoneNumber, buyNow }) {
    let [isOpen, setIsOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("online");  // Default: Online Payment

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    return (
        <>
            <div className="text-center">
                <button
                    type="button"
                    onClick={openModal}
                    className="w-full bg-violet-600 py-2 rounded-lg text-white font-bold"
                >
                    Buy Now
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                    <div className="fixed inset-0 flex items-center justify-center p-6 sm:p-10 overflow-y-auto">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-lg bg-white shadow-xl p-8 space-y-6">
                                <div className="flex flex-col items-center justify-center">
                                    <h2 className="text-2xl font-bold text-gray-800 text-center pt-6 sm:pt-10 mb-6">
                                        Enter Shipping Details
                                    </h2>
                                </div>

                                <form className="space-y-5">
                                    <div className="flex flex-col">
                                        <label className="mb-1 text-sm font-medium text-gray-700">Enter Full Name</label>
                                        <input 
                                            type="text" 
                                            value={name} 
                                            onChange={(e) => setName(e.target.value)}
                                            className="border border-gray-300 rounded-lg p-3 bg-white text-gray-900 outline-none w-full focus:ring-2 focus:ring-violet-500"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="mb-1 text-sm font-medium text-gray-700">Enter Full Address</label>
                                        <input 
                                            type="text" 
                                            value={address} 
                                            onChange={(e) => setAddress(e.target.value)}
                                            className="border border-gray-300 rounded-lg p-3 bg-white text-gray-900 outline-none w-full focus:ring-2 focus:ring-violet-500"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="mb-1 text-sm font-medium text-gray-700">Enter Pincode</label>
                                        <input 
                                            type="text" 
                                            value={pincode} 
                                            onChange={(e) => setPincode(e.target.value)}
                                            className="border border-gray-300 rounded-lg p-3 bg-white text-gray-900 outline-none w-full focus:ring-2 focus:ring-violet-500"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="mb-1 text-sm font-medium text-gray-700">Enter Mobile Number</label>
                                        <input 
                                            type="text" 
                                            value={phoneNumber} 
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            className="border border-gray-300 rounded-lg p-3 bg-white text-gray-900 outline-none w-full focus:ring-2 focus:ring-violet-500"
                                            required
                                        />
                                    </div>

                                    <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
                                        <label className="block mb-3 text-sm font-medium text-gray-900">Select Payment Method</label>
                                        <div className="flex flex-col space-y-2">
                                            <label className="flex items-center">
                                                <input 
                                                    type="radio" 
                                                    value="online" 
                                                    checked={paymentMethod === "online"} 
                                                    onChange={() => setPaymentMethod("online")} 
                                                    className="mr-2"
                                                />
                                                Pay Online (UPI, Cards, Net Banking)
                                            </label>
                                            <label className="flex items-center">
                                                <input 
                                                    type="radio" 
                                                    value="cod" 
                                                    checked={paymentMethod === "cod"} 
                                                    onChange={() => setPaymentMethod("cod")} 
                                                    className="mr-2"
                                                />
                                                Cash on Delivery (COD)
                                            </label>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => { buyNow(paymentMethod); closeModal(); }} 
                                        type="button" 
                                        className="w-full text-white bg-violet-600 hover:bg-violet-800 font-medium rounded-lg text-lg px-6 py-3"
                                    >
                                        Order Now
                                    </button>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
