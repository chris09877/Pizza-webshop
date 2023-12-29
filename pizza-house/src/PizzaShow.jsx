import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../config";
import axios from 'axios';

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
        <div>
            <h1>Pizza Details</h1>
            {pizza && (
                <div>
                    <h2>{pizza.name}</h2>
                    <p>Price: ${pizza.price}</p>
                    <p>{pizza.description}</p>
                    <img src={pizza.imageurl} alt={pizza.name} />
                </div>
            )}
        </div>
    );
};

export default PizzaDetails;
