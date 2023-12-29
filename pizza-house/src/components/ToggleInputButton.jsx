import React, { useState } from 'react';
import SubmitBtn from './SubmitBtn'; // Import the CustomInput component

const ToggleInputButton = () => {
  const [showInput, setShowInput] = useState(false);

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  return (
    <div>
      <button onClick={toggleInput}>Toggle Input</button>
      {showInput ? (
        <SubmitBtn
          type="submit"
          className="submitBtn"
          placeholder="add"
        />
      ) : null}
    </div>
  );
};

export default ToggleInputButton;
