// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import Modal from '../../components/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart, clearCart, increaseQuantity, decreaseQuantity } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';
import { fireDB } from '../../fireabase/FirebaseConfig';
import { Link } from 'react-router-dom';

function Cart() {
  const context = useContext(myContext);
  const { mode } = context;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const totalAmount = cartItems.reduce((acc, cartItem) => acc + cartItem.price * cartItem.quantity, 0);
  const shipping = totalAmount > 0 ? 50 : 0; // Shipping applied only if the cart has items
  const grandTotal = totalAmount + shipping;

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('online');

  // ✅ Buy Now function with Razorpay integration
  const buyNow = async (paymentMethod) => {
    if (!name || !address || !pincode || !phoneNumber) {
      return toast.error("⚠️ All fields are required!", { position: "top-center", autoClose: 1000 });
    }

    const addressInfo = { name, address, pincode, phoneNumber, date: new Date().toLocaleString() };
    console.log("📌 Address Info in buyNow:", addressInfo);

    if (paymentMethod === "cod") {
      console.log("🛒 COD Order Initiated!");
      placeOrder(paymentMethod, "Pending Payment (COD)", null, addressInfo);
    } else {
      const amountInPaise = grandTotal * 100;
      const options = {
        key: "rzp_test_mKMsB7RPTz847u",
        amount: amountInPaise,
        currency: "INR",
        name: "CozyThreads",
        description: "Purchase from CozyThreads",
        handler: async function (response) {
          if (response.razorpay_payment_id) {
            placeOrder(paymentMethod, "Paid", response.razorpay_payment_id, addressInfo);
          } else {
            toast.error("❌ Payment failed! Try again.");
          }
        },
        prefill: {
          name: name,
          email: JSON.parse(localStorage.getItem("user")).user.email,
          contact: phoneNumber,
        },
        theme: { color: "#3399cc" },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    }
  };

  // ✅ Function to Place Order in Firestore
  const placeOrder = async (paymentMethod, paymentStatus, paymentId = null, addressInfo) => {
    try {
      if (!cartItems.length) {
        toast.error("Your cart is empty!");
        return;
      }

      if (!addressInfo) {
        console.error("❌ Address Info is Undefined!");
        toast.error("Failed to place order! Missing address info.");
        return;
      }

      const orderInfo = {
        orderId: uuidv4(),
        cartItems,
        addressInfo,
        date: new Date().toLocaleString(),
        email: JSON.parse(localStorage.getItem("user")).user.email,
        userid: JSON.parse(localStorage.getItem("user")).user.uid,
        paymentMethod,
        paymentStatus,
        paymentId,
      };

      console.log("📌 Placing Order:", orderInfo);

      const orderRef = collection(fireDB, "orders");
      await addDoc(orderRef, orderInfo);

      dispatch(clearCart());
      localStorage.removeItem("cart");

      toast.success("🎉 Order placed successfully!");
    } catch (error) {
      console.error("❌ Order Placement Error:", error);
      toast.error("Failed to place order!");
    }
  };

  return (
    <Layout>
      <div className='h-screen bg-gray-100 pt-5 mb-[60%]' style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '' }}>
        <h1 className='mb-10 text-center text-2xl font-bold'>Cart Items</h1>
        <div className='mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0'>
          <div className='rounded-lg md:w-2/3'>
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className='justify-between mb-6 rounded-lg border drop-shadow-xl bg-white p-6 sm:flex sm:justify-start'>
                <Link to={`/productinfo/${item.id}`} className="block">
                  <img src={item.imageUrl} alt='product-image' className='w-full rounded-lg sm:w-40 cursor-pointer' />
                </Link>
                <div className='sm:ml-4 sm:flex sm:w-full sm:justify-between'>
                  <div className='mt-5 sm:mt-0'>
                    <h2 className='text-lg font-bold'>{item.title}</h2>
                    <p className='text-sm'>{item.description}</p>
                    <p className='mt-1 text-xs font-semibold'>Size: {item.selectedSize || 'N/A'}</p>
                    <p className='mt-1 text-xs font-semibold'>₹{item.price}</p>

                    {/* ✅ Quantity controls */}
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => dispatch(decreaseQuantity({ id: item.id, selectedSize: item.selectedSize }))}
                        className="px-3 py-1 bg-red-500 text-white rounded-l">
                        -
                      </button>
                      <span className="px-4 py-1 border">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(increaseQuantity({ id: item.id, selectedSize: item.selectedSize }))}
                        className="px-3 py-1 bg-green-500 text-white rounded-r">
                        +
                      </button>
                    </div>
                  </div>

                  {/* ✅ Restore Remove Button */}
                  <div onClick={() => dispatch(deleteFromCart({ id: item.id, selectedSize: item.selectedSize }))} className='mt-4 flex justify-between sm:mt-0 sm:block cursor-pointer'>
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79' />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Updated Total Price Section */}
          <div className='mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:w-1/3'>
            <Modal {...{ name, address, pincode, phoneNumber, setName, setAddress, setPincode, setPhoneNumber, buyNow }} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
