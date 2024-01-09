import React from "react";
import Form from "./components/Form";
import Navbar from "./components/NavBar";
import BackButton from './components/BackButton';

function ValidateOrder(){
    return(
        
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
        <h1 className="text-3xl font-semibold mb-4">Validate Order</h1>
        <div className="max-w-md w-full">
          <Form />
        </div>
      </main>
      <div>
      {/* Your page content */}
      <BackButton /> {/* Use the BackButton component */}
    </div>
    </div>
    )
}

export default ValidateOrder;