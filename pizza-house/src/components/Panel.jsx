import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from "../../config";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const Panel = () => {
  const [orderP, setOrderP] = useState([]);
  const [orderD, setOrderD] = useState([]);
  const [orderC, setOrderC] = useState([]);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const navigateToOrderShow = (orderId) => {

    Cookies.set("orderId", orderId, { expires: 1 / 24 }); // 1/24 represents 1 hour
    navigate(`/order/${orderId}`);
  };

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get(`${config.apiUrl}/orders`);
        const orders = response.data;
        console.log(orders);
        const pendingOrders = orders.filter(order => order.status === 'pending');
        const deliveredOrders = orders.filter(order => order.status === 'delivered');
        const confirmedOrders = orders.filter(order => order.status === 'confirmed');

        setOrderP(pendingOrders);
        setOrderD(deliveredOrders);
        setOrderC(confirmedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }

    fetchOrders();
  }, []);

  const handleUpdateStatus = async (user, newStatus) => {
    try {
      console.log(`the user var: ${user}`);
      await axios.patch(`${config.apiUrl}/orders/checkout/${user}`, { status: newStatus });
      // Handle success, maybe refetch orders or update locally without another fetch
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDeleteOrder = async (user) => {
    try {
      await axios.delete(`${config.apiUrl}/orders/delete/${user}`);
      // Handle success, maybe refetch orders or update locally without another fetch
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const renderTable = (orders) => {
    let count = 0;

    return (
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Data</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {orders.map((order, index) => (

            <tr
              key={order._id}
              className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 cursor-pointer ${order.category === 'special' ? 'border-2 border-blue-200' : ''}`}
            >
              <td className="px-6 py-4 whitespace-nowrap" onClick={() => navigateToOrderShow(order._id)}>
                <span className="block text-sm font-medium text-gray-900" >
                  #{index + 1}
                </span>
                <span className="block text-sm text-gray-500">
                  Pizzas: {order.pizzas.length}
                </span>
                <span className="block text-sm text-gray-500">
                  Time: {order.order_date}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <form onSubmit={(e) => {
                  if (order.status === 'pending') {
                    handleUpdateStatus(order.user, 'confirmed');
                  } else if (order.status === 'confirmed') {
                    handleUpdateStatus(order.user, 'delivered');
                  } else if (order.status === 'delivered') {
                    handleDeleteOrder(order._id);
                  }
                }}>
                  <input type="hidden" name="user" value={order.user} />
                  <button
                    type="submit"
                    className={`px-2 py-1 rounded ${order.status === 'pending'
                        ? 'bg-blue-500 text-white'
                        : order.status === 'confirmed'
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                      } hover:bg-opacity-80`}
                  >
                    {order.status === 'pending' ? 'Confirm' : order.status === 'confirmed' ? 'Deliver' : 'Delete'}
                  </button>
                </form>
              </td>
            </tr>
          ))

          }
        </tbody>
      </table>

    );
  };
  console.log("pending: ", orderP);
  console.log("confirmled: ", orderC);
  console.log("delivered: ", orderD);

  return (
    <div>
      <h2 className="text-left font-special text-2xl mt-6">Pending Orders</h2>
      {renderTable(orderP)}

      <h2 className="text-left font-special text-2xl mt-6">Confirmed Orders</h2>
      {renderTable(orderC)}

      <h2 className="text-left font-special text-2xl mt-6">Delivered Orders</h2>
      {renderTable(orderD)}


    </div>
  );
};

export default Panel;
