import React, { useEffect, useState } from "react";
import config from "../config";
import axios from 'axios';
import { Link } from "react-router-dom";
import ToggleInputButton from './components/ToggleInputButton';
import SubmitBtn from './components/SubmitBtn';
import Cookies from "js-cookie";
import OrderDetails from './components/OrderDetails';

export default function Pizzas() {
    const [pizzas, setPizzas] = useState([]);
    const [showBtn, setShowBtn] = useState(true);
    const [userId, setUserId] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);

    // let userId;
    const handleOrderClick = async ()  => {
        setShowBtn(!showBtn); // Toggles the showBtn state when the button is clicked
        try {
            console.log(`${config.apiUrl}}/orders/create`);
            const response = await axios.post(`${config.apiUrl}/orders/create`);
            const data = response.data;
            setUserId(data.user);
            console.log(`user id: ${userId}`);
            console.log(`data id: ${data._id}`);
            console.log(`user id from data: ${data.user}`);
            localStorage.setItem('userId', data.user);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Collect form data
        const formData = new FormData(e.target);
        const data = {};
        formData.forEach((value, key) => {
          data[key] = value;
        });
        data['user']=userId;
        console.log(`data in handlesubmit: ${data}`);
        try {
        console.log(`${config.apiUrl}/orders/update/${userId}`);
          const response = await axios.patch(`${config.apiUrl}/orders/update/${userId}`, data);
          
          //console.log(response.data); // Handle the response here (success message or other actions)
          
        //   setOrderDetails(await response.data);
        //   console.log(` data send to component: ${orderDetails}`);
          
          
        } catch (error) {
          console.error('Error:', error); // Handle errors here
        }
      };


    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                console.log(`${config.apiUrl}/pizzas`);
                const response = await axios.get(`${config.apiUrl}/pizzas`);
                const data = response.data;

                if (Array.isArray(data)) {
                    setPizzas(data);
                } else {
                    console.log('Error: pizzas is not an array');
                    console.log(data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchPizzas();
    }, []);

    return (
       
        <div>
             <div>
                <button onClick={handleOrderClick}>ORDER</button>
             </div>
             <div>
      <OrderDetails

        title="Your Order"
        
      />
      {/* Other components */}
      {/* ... */}
    </div>
            <h1>Pizzas</h1>
            {Array.isArray(pizzas) &&
                pizzas.map((pizza) => (
                    <form key={pizza._id} onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <Link to={`/pizzas/${pizza._id}`} >

                                <h2>{pizza.name}</h2>
                                <img src={pizza.imgUrl} alt={pizza.name} />
                                <p>{pizza.price}</p>
                                <p>{pizza.description}</p>
                                <label>
                                    Quantity:
                                    <input
                                        type="number"
                                        name="quantity"
                                        defaultValue={1} // Default quantity is 1
                                        min={1}
                                    />
                                </label>
                            </Link>
                            <button hidden={showBtn} type="submit">Add</button>

                        </div>
                        <input type="hidden" name="name" value={pizza.name} />
                        <input type="hidden" name="price" value={pizza.price} />
                        <input type="hidden" name="user" value={userId} />
                        <input type="hidden" name="pizza_id" value={pizza._id} />
                    </form>
                ))};
        </div>
    );
};
