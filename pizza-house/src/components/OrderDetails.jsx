import React, { useState } from 'react';
import config from "../../config";
import axios from 'axios';

const OrderDetails = ({ title }) => {
    const storedUserId = localStorage.getItem('userId');
    console.log(`user id from component: ${storedUserId}`);
    const [isExpanded, setIsExpanded] = useState(false);
    const [pizzas, setPizzas] = useState([]);
    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
        getOrderDetails();
    };
    const handleOrder = () => {
      window.location.href = '/checkout'; // Redirect to checkout page on button click
    };
    const getOrderDetails = async () => {
        try {
            console.log(`fetch from component order etails: ${config.apiUrl}/orders/user/${storedUserId}`);
            const response = await axios.get(`${config.apiUrl}/orders/user/${storedUserId}`);
            const data = response.data;
            setPizzas(data.pizzas);


        }
        catch (error) {
            console.log(error);
        }
    };


    return (
        // <div>
        //     <header onClick={toggleExpansion}>
        //         <h3 >Your Order</h3>
        //         {/* <div >
        //   <span >{orderItemCount} items</span>
        //   <span >Total: €{totalPrice}</span>
        // </div> */}
        //     </header>
        //     {isExpanded && (
        //         <div>
        //             <p>Order Details:</p>

        //             {pizzas ? (
        //                 <div>
        //                     {pizzas.map((pizza, index) => (
        //                         <div key={index}>
        //                             <p>Name: {pizza.name}</p>
        //                             <p>Quantity: {pizza.quantity}</p>
        //                         </div>
        //                     ))}
        //                 </div>
        //             ) : (
        //                 <p>Let's order a tasty pizza!</p>
        //             )}
        //             <div>
        //                 <button>Order</button>
        //             </div>
        //         </div>
        //     )}
        // </div>



        <div className="bg-gray-100 p-4 shadow-md">
  <header className="cursor-pointer" onClick={toggleExpansion}>
    <h3 className="text-xl font-bold mb-2">Your Order</h3>
    {/* Additional information */}
    {/* <div className="flex justify-between">
      <span>{orderItemCount} items</span>
      <span>Total: €{totalPrice}</span>
    </div> */}
  </header>
  {isExpanded && (
    <div className="mt-4">
      <p className="text-lg font-semibold">Order Details:</p>

      {pizzas ? (
        <div className="mt-2">
          {pizzas.map((pizza, index) => (
            <div key={index} className="mb-2 p-2 border border-gray-300 rounded">
              <p className="text-lg font-medium">Name: {pizza.name}</p>
              <p className="text-sm">Quantity: {pizza.quantity}</p>
            </div>
          ))}
        </div>
        
      ) : (
        <p className="mt-2 text-lg">Let's order a tasty pizza!</p>
      )}
      <div className="mt-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleOrder}>
          Order
        </button>
      </div>
    </div>
  )}
  
</div>

    );
}

export default OrderDetails;
