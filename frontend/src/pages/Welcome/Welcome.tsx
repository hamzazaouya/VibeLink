import React from "react";
import backgroundImage from "./assetes/welcome-page.png";

function WelcomePage () {

    const APP_URL = import.meta.env.VITE_FRONTEND_APP_URL
    console.log(APP_URL)
    return (
        <div>
            <div
            className="relative h-screen w-screen bg-center bg-cover"
            style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
                <div className="absolute z-20 h-screen w-screen  px-8 pt-8">
                    <div className="flex justify-between h-[5%]">
                        <div>
                            <h1 className="text-[1.5rem] lg:text-[2rem] font-[1000] tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-accent-pink from-30% via-accent-red to-accent-salmon">VibeLink</h1>
                        </div>
                        <div>
                            <a  href = {`${APP_URL}/login`}
                                className = "sm:text-[.8rem] lg:text-[1.2rem] font-bold text-black bg-white px-10 py-2 rounded-full hover:text-black">
                                Login
                            </a>
                        </div>
                    </div>
                    <div className = "flex flex-col items-center justify-center text-center h-[95%]">
                        <h1 className = "text-[1.6rem] p-8 text-white text-5xl font-bold font-pacifico">Where Vibe Collide</h1>
                        <a  href = {`${APP_URL}/signup`}
                            className = "capitalize rounded-full font-bold min-w-[15rem] px-4 py-2 bg-gradient-to-r from-accent-pink from-30% via-accent-red to-accent-salmon text-white rounded border border-transparent hover:opacity-80 hover:border-white hover:text-white transition">
                            create account
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WelcomePage