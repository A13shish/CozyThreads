// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react';
import { FaUserTie } from 'react-icons/fa';
import myContext from '../../../context/data/myContext';
import Layout from '../../../components/layout/Layout';
import DashboardTab from './DashboardTab';
import { collection, getDocs } from 'firebase/firestore';
import { fireDB } from '../../../fireabase/FirebaseConfig';

function Dashboard() {
  const context = useContext(myContext);
  const { mode } = context;

  // State variables for dynamic data
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total products
        const productsSnapshot = await getDocs(collection(fireDB, 'products'));
        setTotalProducts(productsSnapshot.size);

        // Fetch total orders (including COD and Online)
        const ordersSnapshot = await getDocs(collection(fireDB, 'orders'));
        setTotalOrders(ordersSnapshot.size);

        // Fetch total users
        const usersSnapshot = await getDocs(collection(fireDB, 'users'));
        setTotalUsers(usersSnapshot.size);
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <section className="text-gray-600 body-font mt-10 mb-10">
        <div className="container px-5 mx-auto mb-10">
          <div className="flex flex-wrap -m-4 text-center">
            {/* Total Products */}
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div
                className="border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300 px-4 py-3 rounded-xl"
                style={{
                  backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                  color: mode === 'dark' ? 'white' : '',
                }}
              >
                <div className="text-purple-500 w-12 h-12 mb-3 inline-block">
                  <FaUserTie size={50} />
                </div>
                <h2 className="title-font font-medium text-3xl text-black fonts1" style={{ color: mode === 'dark' ? 'white' : '' }}>
                  {totalProducts}
                </h2>
                <p className="text-purple-500 font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>
                  Total Products
                </p>
              </div>
            </div>

            {/* Total Orders (Includes COD and Online Orders) */}
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div
                className="border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300 px-4 py-3 rounded-xl"
                style={{
                  backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                  color: mode === 'dark' ? 'white' : '',
                }}
              >
                <div className="text-purple-500 w-12 h-12 mb-3 inline-block">
                  <FaUserTie size={50} />
                </div>
                <h2 className="title-font font-medium text-3xl text-black fonts1" style={{ color: mode === 'dark' ? 'white' : '' }}>
                  {totalOrders}
                </h2>
                <p className="text-purple-500 font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>
                  Total Orders (COD + Online)
                </p>
              </div>
            </div>

            {/* Total Users */}
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div
                className="border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300 px-4 py-3 rounded-xl"
                style={{
                  backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                  color: mode === 'dark' ? 'white' : '',
                }}
              >
                <div className="text-purple-500 w-12 h-12 mb-3 inline-block">
                  <FaUserTie size={50} />
                </div>
                <h2 className="title-font font-medium text-3xl text-black fonts1" style={{ color: mode === 'dark' ? 'white' : '' }}>
                  {totalUsers}
                </h2>
                <p className="text-purple-500 font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>
                  Total Users
                </p>
              </div>
            </div>
          </div>
        </div>
        <DashboardTab />
      </section>
    </Layout>
  );
}

export default Dashboard;