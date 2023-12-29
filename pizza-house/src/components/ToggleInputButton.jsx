import React, { useState } from 'react';
import SubmitBtn from './SubmitBtn'; // Import the CustomInput component

const ToggleInputButton = ({ showSubmitBtn }) => {
    const [showInput, setShowInput] = useState(false);
  
    const toggleInput = () => {
      setShowInput(!showInput);
    };
  
    return (
      <div>
        <button onClick={toggleInput}>Toggle Input</button>
        {showInput ? 
          <SubmitBtn
            type="submit"
            className="submitBtn"
            placeholder="add"
            
          />
        : null}
        {showSubmitBtn && <button type="submit">Add to Cart</button>}
      </div>
    );
  };
  

export default ToggleInputButton;
