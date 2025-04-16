// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../../fireabase/FirebaseConfig";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";

function Order() {
  const context = useContext(myContext);
  const { mode, loading, setLoading } = context;
  const [orders, setOrders] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user")).user.uid; // Get logged-in user ID

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const ordersSnapshot = await getDocs(collection(fireDB, "orders"));
        const ordersList = ordersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Fetched Orders:", ordersList); // Debugging

        // ✅ Filter orders **correctly** (COD + Online)
        const userOrders = ordersList.filter(order => order.userid === userId);

        // ✅ **Sort orders by date & time (latest first)**
        const sortedOrders = userOrders.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setOrders(sortedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <Layout>
      {loading && <Loader />}
      {orders.length > 0 ? (
        <>
          <div className="h-full pt-10">
            {orders.map(order => (
              <div key={order.id} className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                {order.cartItems.map(item => (
                  <div key={item.id} className="rounded-lg md:w-2/3">
                    <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                      style={{ backgroundColor: mode === "dark" ? "#282c34" : "", color: mode === "dark" ? "white" : "" }}
                    >
                      <img src={item.imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
                      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                        <div className="mt-5 sm:mt-0">
                          <h2 className="text-lg font-bold">{item.title}</h2>
                          <p className="mt-1 text-xs">{item.description}</p>
                          <p className="mt-1 text-xs font-semibold">₹{item.price}</p>
                          <p className="mt-1 text-xs font-semibold">
                            Payment Method: <span className={order.paymentMethod === "cod" ? "text-red-500" : "text-green-500"}>
                              {order.paymentMethod === "cod" ? "Cash on Delivery" : "Online"}
                            </span>
                          </p>
                          <p className="mt-1 text-xs font-semibold">Status: {order.paymentStatus}</p>
                          <p className="mt-1 text-xs font-semibold">Order Date: {order.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      ) : (
        <h2 className="text-center text-2xl text-white">No Orders Found</h2>
      )}
    </Layout>
  );
}

export default Order;
