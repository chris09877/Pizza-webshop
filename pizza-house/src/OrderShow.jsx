import React from "react";
import FinalizedOrderDetails from "./components/FinalizedOrderDetails";
import Navbar from "./components/NavBar";
import BackButton from './components/BackButton';

function OrderShow() {
    return (
        
            <div className="flex flex-col min-h-screen">
                <Navbar />

                <main className="flex-grow flex flex-col items-center justify-center px-4 py-8 ">
                    <h1 className="text-5xl font-semibold mb-4">Order Detail</h1>
                    <FinalizedOrderDetails />
                </main>
                <div>
      {/* Your page content */}
      <BackButton /> {/* Use the BackButton component */}
    </div>
            </div>
       
    )
}

export default OrderShow;