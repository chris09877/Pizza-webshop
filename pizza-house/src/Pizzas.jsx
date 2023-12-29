import React, { useEffect, useState } from "react";
import config from "../config.js";
import axios from 'axios';
import { Link } from "react-router-dom";

export default function Pizzas() {
    const [pizzas, setPizzas] = useState([]);

  const handleSubmit = async (e, pizzaId) => {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Send a POST request to 'order/create' endpoint
    try {
      const response = await axios.post(`${config.apiUrl}/order/create`, data);
      console.log(response.data); // Handle the response here (success message or other actions)
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
            <h1>Pizzas</h1>
            {Array.isArray(pizzas) &&
  pizzas.map((pizza) => (
    <form key={pizza._id} onSubmit={(e) => handleSubmit(e, pizza._id)}>
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
        <button type="submit">Add to Cart</button>
      </div>
      <input type="hidden" name="name" value={pizza.name} />
      <input type="hidden" name="price" value={pizza.price} />

    </form>
  ))}

        </div>
    );
};
