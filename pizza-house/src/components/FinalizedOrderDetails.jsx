import React, { useState, useEffect } from 'react';
import config from "../../config";
import axios from 'axios';
import Cookies from 'js-cookie';
const FinalizedOrderDetails = () => {
    const storedUserId = localStorage.getItem('userId');
    console.log(`user id from component: ${storedUserId}`);
    const orderId = Cookies.get('orderId');
    const [order, setOrder] = useState(null);
    const [pizzas, setPizzas] = useState([]);
    
   
    useEffect(() => {
    const getOrderDetails = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/orders/${orderId}`);
            const data = response.data;
            setOrder(data); // Set the entire order data
            setPizzas(data.pizzas); // Set pizzas data from order

        } catch (error) {
            console.log(error);
        }
    };
    getOrderDetails();

}, []);
    return (
        // <div>
            
        //         <h3>Your Order</h3>
        //         {/* Display other order information */}
        //         {order && (
        //             <div>
        //                 <p>Total Price: €{order.total_price}</p>
        //                 <p>Order Date: {new Date(order.order_date).toLocaleDateString()}</p>
        //                 <p>Phone: {order.phone}</p>
        //                 <p>Address: {order.address}</p>
        //                 <p>Status: {order.status}</p>
        //             </div>
        //         )}
            
        //         <div>
        //             <p>Order Details:</p>
        //             {/* Check if pizzas array exists and has elements */}
        //                 <div>
        //                     {pizzas.map((pizza, index) => (
        //                         <div key={index}>
        //                             <p>Name: {pizza.name}</p>
        //                             <p>Quantity: {pizza.quantity}</p>
        //                             {/* Add other pizza details if available */}
        //                             {/* <p>Price: {pizza.price}</p> */}
        //                         </div>
        //                     ))}
        //                 </div>
                    
                    
        //         </div>
            
        // </div>

//         <div className="max-w-lg mx-auto p-4">
//   <h3 className="text-2xl font-bold mb-4">Your Order</h3>

//   {order && (
//     <div className="bg-gray-100 p-4 mb-4 rounded-md">
//       <p>Total Price: €{order.total_price}</p>
//       <p>Order Date: {new Date(order.order_date).toLocaleDateString()}</p>
//       <p>Phone: {order.phone}</p>
//       <p>Address: {order.address}</p>
//       <p>Status: {order.status}</p>
//     </div>
//   )}

//   <div>
//     <p className="text-xl font-bold mb-2">Order Details:</p>

//     {pizzas.length > 0 ? (
//       <div className="space-y-4">
//         {pizzas.map((pizza, index) => (
//           <div key={index} className="bg-gray-100 p-4 rounded-md">
//             <p className="text-lg font-semibold">{pizza.name}</p>
//             <p>Quantity: {pizza.quantity}</p>
//             {/* Add other pizza details if available */}
//             {/* <p>Price: {pizza.price}</p> */}
//           </div>
//         ))}
//       </div>
//     ) : (
//       <p>No pizzas in this order.</p>
//     )}
//   </div>
// </div>

<div className='bg-white rounded-md shadow-md mt-4' >
  <h3 className="text-2xl font-bold mb-4">Your Order</h3>

  {order && (
    <div className="mb-6">
      <p>Total Price: €{order.total_price}</p>
      <p>Order Date: {new Date(order.order_date).toLocaleDateString()}</p>
      <p>Phone: {order.phone}</p>
      <p>Address: {order.address}</p>
      <p>Status: {order.status}</p>
    </div>
  )}

  <div className="flex flex-col md:flex-row">
    <div className="w-full md:w-1/2 pr-4">
      <p className="text-xl font-bold mb-2">Order Details:</p>

      {pizzas.length > 0 ? (
        <div className="space-y-4">
          {pizzas.map((pizza, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-md">
              <p className="text-lg font-semibold">{pizza.name}</p>
              <p>Quantity: {pizza.quantity}</p>
              {/* Add other pizza details if available */}
              {/* <p>Price: {pizza.price}</p> */}
            </div>
          ))}
        </div>
      ) : (
        <p>No pizzas in this order.</p>
      )}
    </div>

    <div className="w-full md:w-1/2 pl-4">
      {/* Add content here */}
    </div>
  </div>
</div>


    );
};

export default FinalizedOrderDetails;
