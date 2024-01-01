import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from "../../config";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const Panel = () => {
  const [orderP, setOrderP] = useState([]);
  const [orderD, setOrderD] = useState([]);
  const [orderC, setOrderC] = useState([]);
  const navigate = useNavigate();
  const storedUserId = localStorage.getItem('userId');
  const navigateToOrderShow = (orderId) => {
    Cookies.set("orderId", orderId, { expires: 1/24 }); // 1/24 represents 1 hour
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

  const handleUpdateStatus = async (storedUserId, newStatus) => {
    try {
      await axios.patch(`${config.apiUrl}/orders/checkout/${storedUserId}`, { status: newStatus });
      // Handle success, maybe refetch orders or update locally without another fetch
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDeleteOrder = async (storedUserId) => {
    try {
      await axios.delete(`${config.apiUrl}/orders/delete/${storedUserId}`);
      // Handle success, maybe refetch orders or update locally without another fetch
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const renderTable = (orders) => {
    let count = 0;
    return (
      <table>
        <thead>
          <tr>
            <th>Order Data</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => 
          (
           
            <tr key={order._id} onClick={ () => navigateToOrderShow(order._id)}>
              <td><span>#{count++}</span>
                <span>pizzas:{order.pizzas.length}</span>
              <span>time: {order.order_date}</span>
                </td>
              <td>
                <form onSubmit={(e) => {
                //   e.preventDefault();
                  if (order.status === 'pending') {
                    handleUpdateStatus(storedUserId, 'confirmed');
                  } else if (order.status === 'confirmed') {
                    handleUpdateStatus(storedUserId, 'delivered');
                  } else if (order.status === 'delivered') {
                    handleDeleteOrder(order._id);
                  }
                }}>
                  <input type="hidden" name="user" value={order.user} />
                  <button type="submit">
                    {order.status === 'pending' ? 'Confirm' : (order.status === 'confirmed' ? 'Deliver' : 'Delete')}
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
console.log("pending: ",orderP);
console.log("confirmled: ",orderC);
console.log("delivered: ",orderD);

  return (
    <div>
      <h2>Pending Orders</h2>
      {renderTable(orderP)}

      <h2>Delivered Orders</h2>
      {renderTable(orderD)}

      <h2>Confirmed Orders</h2>
      {renderTable(orderC)}
    </div>
  );
};

export default Panel;
