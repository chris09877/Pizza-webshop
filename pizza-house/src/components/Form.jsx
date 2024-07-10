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
    name: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Custom validations
    if (!formData.name.match(/^[a-zA-Z\s]*$/)) {
      alert('Name cannot contain numbers');
      return;
    }



    if (isNaN(formData.phone)) {
      alert('Phone numbers accept only numbers');
      return;
    }

    try {
      const response = await axios.patch(`${config.apiUrl}/orders/checkout/${storedUserId}`, formData);
      console.log('Order updated:', response.data);
      console.log(`${config.apiUrl}/orders/checkout/${storedUserId}`);
      alert('Order proceed');
      localStorage.clear();
      window.location.href = '/';
    } catch (error) {
      console.error('Error updating order:', error);
      // Handle error cases
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-form max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">

      <div className="mb-4">
        <label htmlFor="order_date" className="block text-gray-700 font-semibold mb-2">Order Date:</label>
        <input
          type="datetime-local"
          id="order_date"
          name="order_date"
          required
          value={formData.order_date}
          onChange={handleChange}
          className="form-input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="form-input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="form-input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          required
          value={formData.address}
          onChange={handleChange}
          className="form-input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <input type="hidden" name='user' value={storedUserId} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
