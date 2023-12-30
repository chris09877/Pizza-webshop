import React, { useState } from 'react';
import axios from 'axios';
import config from "../../config";

const Form = () => {
    const storedUserId = localStorage.getItem('userId');
  
  const [formData, setFormData] = useState({
    order_date: '',
    phone: '',
    address: '',
    status: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`${config.apiUrl}/orders/checkout/${storedUserId}`, formData);
      console.log('Order updated:', response.data);
      console.log(`${config.apiUrl}/orders/checkout/${storedUserId}`);
      // Handle success or further actions upon successful update
    } catch (error) {
      console.error('Error updating order:', error);
      // Handle error cases
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="order_date">Order Date:</label>
        <input
          type="datetime-local"
          id="order_date"
          name="order_date"
          value={formData.order_date}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>
      {/* <div>
        <label htmlFor="status">Status:</label>
        <input
          type="text"
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        />
      </div> */}
      <input type="hidden" name='user' value={storedUserId} />
      <button type="submit">Update Order</button>
    </form>
  );
};

export default Form;
