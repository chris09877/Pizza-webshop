import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {config} from "../config.js";
import axios from 'axios';

const PizzaDetails = () => {
    const [pizza, setPizza] = useState({});
    const { id } = useParams(); 
    console.log(id);

    useEffect(() => {
        const fetchPizza = async () => {
            try {
                const response = await axios.get(`${config.apiUrl}/pizzas/${id}`);
                const data = response.data;
                setPizza(data);
            } catch (error) {
                console.log(error);
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
