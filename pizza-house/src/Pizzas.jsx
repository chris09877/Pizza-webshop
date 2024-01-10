import React, { useEffect, useState } from "react";
import config from "../config";
import axios from 'axios';
import { Link } from "react-router-dom";
import ToggleInputButton from './components/ToggleInputButton';
import SubmitBtn from './components/SubmitBtn';
import Cookies from "js-cookie";
import OrderDetails from './components/OrderDetails';
import Navbar from "./components/NavBar";
export default function Pizzas() {
    const [pizzas, setPizzas] = useState([]);
    const [showBtn, setShowBtn] = useState(true);
    const [userId, setUserId] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);

    // let userId;
    const handleOrderClick = async () => {
        setShowBtn(!showBtn); // Toggles the showBtn state when the button is clicked
        if (localStorage.getItem('userId') === null) {
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
        data['user'] = localStorage.getItem('userId');
        console.log(`data in handlesubmit: ${data}`);
        try {
            console.log(`${config.apiUrl}/orders/update/${localStorage.getItem('userId')}`);
            const response = await axios.patch(`${config.apiUrl}/orders/update/${localStorage.getItem('userId')}`, data);

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
            <div className="flex justify-center items-center">
                <Navbar />
            </div>
            <div>
                <button onClick={handleOrderClick}>ORDER</button>
            </div>
            <div>
                <OrderDetails

                    title="Your Order"

                />

            </div>
            <h1>MENU</h1>
            {Array.isArray(pizzas) &&

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {pizzas.map((pizza) => (
                        <form key={pizza._id} onSubmit={(e) => handleSubmit(e)}>
                            <div className="bg-white p-4 shadow-md">
                                <Link to={`/pizzas/${pizza._id}`} className="block">
                                    <h2 className="text-lg font-semibold mb-2">{pizza.name}</h2>
                                    <img src={`/${pizza.name}.jpg`} alt={pizza.name} className="w-full h-40 object-cover mb-2" />
                                    <p className="text-gray-600 mb-2">{pizza.price}</p>
                                    <p className="text-sm text-gray-500 mb-2">{pizza.description}</p>

                                </Link>
                                <label className="block mb-2">
                                    Quantity:
                                    <input
                                        type="number"
                                        name="quantity"
                                        defaultValue={1} // Default quantity is 1
                                        min={1}
                                        className="block w-full border border-gray-300 rounded px-2 py-1"
                                    />
                                </label>
                                <button hidden={showBtn} type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                    Add
                                </button>
                                <input type="hidden" name="name" value={pizza.name} />
                                <input type="hidden" name="price" value={pizza.price} />
                                <input type="hidden" name="user" value={userId} />
                                <input type="hidden" name="pizza_id" value={pizza._id} />
                            </div>
                        </form>
                    ))}
                </div>

            }
        </div>
    );
};
