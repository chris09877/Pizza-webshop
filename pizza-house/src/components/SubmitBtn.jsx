import React from 'react';

const SubmitBtn = ({ type, className, placeholder }) => {
  return <input type={type} className={className} placeholder={placeholder} />;
};

export default SubmitBtn;
