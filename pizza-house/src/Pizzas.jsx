import React, { useEffect, useState } from "react";
import config from "../config";
import axios from 'axios';
import { Link } from "react-router-dom";

export default function Pizzas() {
    const [pizzas, setPizzas] = useState([]);

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
            <h1>Pizzas</h1>
            {Array.isArray(pizzas) && pizzas.map((pizza) => (
                <Link to={`/pizzas/${pizza._id}`} >
                    <div key={pizza._id}>
                        <h2>{pizza.name}</h2>
                        <img src={pizza.imgUrl} alt={pizza.name} />
                        <p>{pizza.description}</p>
                    </div>
                </Link>
                                

            ))}
        </div>
    );
};
