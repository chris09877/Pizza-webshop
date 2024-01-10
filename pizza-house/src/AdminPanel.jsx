import React from "react";
import Panel from "./components/Panel";
import Navbar from "./components/NavBar";

function AdminPanel() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
                <h1 className="text-5xl font-semibold mb-4">Admin Panel</h1>
                <Panel />
            </main>
        </div>
    )
}

export default AdminPanel;