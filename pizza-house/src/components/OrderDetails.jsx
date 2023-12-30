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
    const getOrderDetails = async () => {
        try {
            console.log(`fetch from component order etails: ${config.apiUrl}/orders/${storedUserId}`);
            const response = await axios.get(`${config.apiUrl}/orders/${storedUserId}`);
            const data = response.data;
            setPizzas(data.pizzas);
            
           
        } 
        catch (error) {
            console.log(error);
        }
    };


return (
    <div>
        <header onClick={toggleExpansion}>
            <h3 >Your Order</h3>
            {/* <div >
          <span >{orderItemCount} items</span>
          <span >Total: €{totalPrice}</span>
        </div> */}
        </header>
        {isExpanded && (
            <div>
                <p>Order Details:</p>

                {pizzas ? (
                    <div>
                        {pizzas.map((pizza, index) => (
                            <div key={index}>
                                <p>Name: {pizza.name}</p>
                                <p>Quantity: {pizza.quantity}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Let's order a tasty pizza!</p>
                )}
                <div>
                    <button>Order</button>
                </div>
            </div>
        )}
    </div>
);
                }

export default OrderDetails;
