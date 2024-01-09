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
    // <form onSubmit={handleSubmit}>
    //   <div>
    //     <label htmlFor="order_date">Order Date:</label>
    //     <input
    //       type="datetime-local"
    //       id="order_date"
    //       name="order_date"
    //       value={formData.order_date}
    //       onChange={handleChange}
    //     />
    //   </div>
    //   <div>
    //     <label htmlFor="phone">Phone:</label>
    //     <input
    //       type="text"
    //       id="phone"
    //       name="phone"
    //       value={formData.phone}
    //       onChange={handleChange}
    //     />
    //   </div>
    //   <div>
    //     <label htmlFor="address">Address:</label>
    //     <input
    //       type="text"
    //       id="address"
    //       name="address"
    //       value={formData.address}
    //       onChange={handleChange}
    //     />
    //   </div>
  //   <form onSubmit={handleSubmit} className="my-form">
  // <div className="form-field">
  //   <label htmlFor="order_date" className="form-label">Order Date:</label>
  //   <input
  //     type="datetime-local"
  //     id="order_date"
  //     name="order_date"
  //     value={formData.order_date}
  //     onChange={handleChange}
  //     className="form-input"
  //   />
  // </div>
  // <div className="form-field">
  //   <label htmlFor="phone" className="form-label">Phone:</label>
  //   <input
  //     type="text"
  //     id="phone"
  //     name="phone"
  //     value={formData.phone}
  //     onChange={handleChange}
  //     className="form-input"
  //   />
  // </div>
  // <div className="form-field">
  //   <label htmlFor="address" className="form-label">Address:</label>
  //   <input
  //     type="text"
  //     id="address"
  //     name="address"
  //     value={formData.address}
  //     onChange={handleChange}
  //     className="form-input"
  //   />
  // </div>
  // <button type="submit" className="form-button">Submit</button>
<form onSubmit={handleSubmit} className="my-form max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
  <div className="mb-4">
    <label htmlFor="order_date" className="block text-gray-700 font-semibold mb-2">Order Date:</label>
    <input
      type="datetime-local"
      id="order_date"
      name="order_date"
      value={formData.order_date}
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
      value={formData.address}
      onChange={handleChange}
      className="form-input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
    />
  </div>
  <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
    Submit
  </button>



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
