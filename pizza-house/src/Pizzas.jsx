// import React, { useEffect, useState }  from "react";
// import config from "../config";
// import axios from 'axios';

// export default function Pizzas(){
//     const [pizzas, setPizzas] = useState([]);

//     useEffect(() => {
//         const fetchPizzas = async () => {
//           try {
//             const response = await axios.get(`${config.apiUrl}/pizzas`);
//             const data = response.data;
//             setPizzas(data);
//             if (Array.isArray(data)) {
//                 setPizzas(data);
//               } else {
//                 console.log('Error: pizzas is not an array');
//                 console.log(`${data}`);
//               }
//           } catch (error) {
//             console.log(error);
//           }
//         };
    
//         fetchPizzas();
//       }, []);
//       return (
//         <div>
//           <h1>Pizzas</h1>
//           {pizzas.map((pizza) => (
//             <h2 key={pizza.id}>{pizza.name}</h2>
//           ))}
//         </div>
//       );
// };

import React, { useEffect, useState } from "react";
import config from "../config";
import axios from 'axios';

export default function Pizzas() {
    const [pizzas, setPizzas] = useState([]);

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
            {/* Check if 'pizzas' is an array before using map */}
            {Array.isArray(pizzas) && pizzas.map((pizza) => (
                <h2 key={pizza.id}>{pizza.name}</h2>
            ))}
        </div>
    );
};
