// import React from 'react';
// import { useHistory } from 'react-router-dom';

// const BackButton = () => {
//   const history = useHistory();

//   const handleGoBack = () => {
//     history.goBack(); // Go back to the previous route
//   };

//   return (
//     <button onClick={handleGoBack}>
//       Go Back
//     </button>
//   );
// };

// export default BackButton;

import React from 'react';
//import { useHistory } from 'react-router-dom';

const BackButton = () => {
  //const history = useHistory();

  const handleGoBack = () => {
    //history.goBack(); // Go back to the previous route
    window.history.back();
  };

  return (
    <button onClick={handleGoBack}>
      Go Back
    </button>
  );
};

export default BackButton;
