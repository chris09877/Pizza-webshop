import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const FinalizedOrderDetails = () => {
    const [orderDetails, setOrderDetails] = useState({
        orderDate: '',
        clientName: '',
        phone: '',
        totalPrice: 0
    });

    const handleChange = (e) => {
        setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
    };

    const validateData = () => {
        const { orderDate, clientName, phone, totalPrice } = orderDetails;

        if (!moment(orderDate, 'YYYY-MM-DD', true).isValid()) {
            alert("Invalid date. Please enter a valid date in YYYY-MM-DD format.");
            return false;
        }

        if (!/^[a-zA-Z\s]*$/.test(clientName)) {
            alert("Client name should contain only letters.");
            return false;
        }

        if (!/^\d+$/.test(phone)) {
            alert("Phone should contain only numbers.");
            return false;
        }

        if (totalPrice <= 0 || isNaN(totalPrice)) {
            alert("Total price should be a positive number.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateData()) {
            try {
                const response = await axios.post('/api/order', orderDetails);
                alert('Order submitted successfully!');
                console.log(response.data);
            } catch (error) {
                console.error("Failed to submit order:", error);
                alert('Failed to submit order.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Order Date:
                <input type="date" name="orderDate" value={orderDetails.orderDate} onChange={handleChange} />
            </label>
            <br />
            <label>
                Client Name:
                <input type="text" name="clientName" value={orderDetails.clientName} onChange={handleChange} />
            </label>
            <br />
            <label>
                Phone:
                <input type="text" name="phone" value={orderDetails.phone} onChange={handleChange} />
            </label>
            <br />
            <label>
                Total Price:
                <input type="number" name="totalPrice" value={orderDetails.totalPrice} onChange={handleChange} />
            </label>
            <br />
            <button type="submit">Submit Order</button>
        </form>
    );
};

export default FinalizedOrderDetails;
