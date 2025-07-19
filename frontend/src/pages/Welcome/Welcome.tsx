import React from "react";
import backgroundImage from "./assetes/welcome-page.png";

function WelcomePage () {
    return (
        <div>
            <div
            className="relative h-screen w-screen bg-center bg-cover"
            style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
                <div className="relative z-20 flex items-center justify-center h-full">
                    <h1 className="text-white text-5xl font-bold font-pacifico">Where Vibe Collide</h1>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                        Click Me
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WelcomePage