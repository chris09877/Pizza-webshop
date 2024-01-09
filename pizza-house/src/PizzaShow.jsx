import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../config";
import axios from 'axios';
import Navbar from "./components/NavBar";
import BackButton from './components/BackButton';
const PizzaDetails = () => {
    const { id } = useParams();
    const [pizza, setPizza] = useState(null);

    useEffect(() => {
        const fetchPizza = async () => {
            console.log(config.apiUrl);

            try {
                console.log("dans le try the pizza show");
                const response = await axios.get(`${config.apiUrl}/pizzas/${id}`);
                console.log(config.apiUrl);
                const data = response.data;
                console.log(data);
                setPizza(data);
            } catch (error) {
                console.log(`${id}
                ${error}`);
            }
        };

        fetchPizza();
    }, [id]);

    return (


        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
                <h1 className="text-5xl font-semibold mb-4">Pizza Details</h1>

                {pizza && (
                    <div className="bg-white rounded-md shadow-md p-6">
                        <h2 className="text-2xl font-bold mb-4">{pizza.name}</h2>
                        <p className="text-lg font-semibold">Price: ${pizza.price}</p>
                        <p className="mb-4">{pizza.description}</p>
                        <img src={`/${pizza.name}.jpg`} alt={pizza.name} className="w-full rounded-md" />
                    </div>
                )}

            </main>
            <div>
      {/* Your page content */}
      <BackButton /> {/* Use the BackButton component */}
    </div>
        </div>
    );
};

export default PizzaDetails;
