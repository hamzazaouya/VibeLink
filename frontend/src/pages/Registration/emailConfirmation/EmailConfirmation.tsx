import "../styles/emailConfirmation.css"
import OTPVerification from "./OTPVerification"
import React, { useState, useEffect} from "react";
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2"

interface UserInfo {
    email: string,
    userName: string
}

const BACKEND_APP_URL = import.meta.env.VITE_BACKEND_APP_URL

function EmailConfirmation () {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState<UserInfo>({email: '', userName: ''});
    
    useEffect(() => {
        async function checkUserStatus() {
            try {
            const response = await axios.get(`${BACKEND_APP_URL}/user/status`, {
                withCredentials: true,
            });
            console.log(response)
            const { emailVerified, isRegistred, userName, email} = response.data;
            setUserInfo({email: email, userName: userName});

            if (emailVerified && !isRegistred) {
                navigate("/register")
            } else if(emailVerified && isRegistred) {
                navigate("/home");
                return;
            }
            } catch (error) {
            navigate("/login");
            }
        }
        checkUserStatus();
    }, [navigate]);

    const handleVerifyClick = async () => {
        try {
            await axios.post(`${BACKEND_APP_URL}/user/verify/email`, {code: otp}, {withCredentials: true});
            navigate('/register');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message || 'Something went wrong!',
            });
}
    };

    const handleResendEmail = async () => {
        try {
            const response = await axios(`${BACKEND_APP_URL}/user/verify/resend`, {withCredentials: true});
            const {message} = response.data;
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: message,
                showConfirmButton: false,
                timer: 2000
            });
        } catch (error) {
             Swal.fire({
                position: "top-end",
                icon: "info",
                title: error.response.data.message || 'Something went wrong!',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    return (
        <div className="flex flex-col bg-background h-screen w-screen px-5">
            <div className="flex items-center justify-start h-[10%]">
                <h1 className="text-[1.5rem] font-[1000] tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-accent-pink from-30% via-accent-red to-accent-salmon">
                VibeLink
                </h1>
            </div>
            <div className="h-[80%] flex flex-col items-center justify-center">
                <div className="email_conf bg-white bg-opacity-30 rounded-xl p-10 mt-5">
                    <h1>Hi <spna className="capitalize text-accent-salmon">{userInfo.userName}</spna> please check your email</h1>
                    <p>We send you a sex-digit code to <span>{userInfo.email}</span>.</p>
                    <p>Didn’t receive an email? <button className="resend"  onClick={handleResendEmail}>Resend</button></p>
                    <div className="flex justify-center">
                        <OTPVerification otp={otp} setOtp={setOtp} />
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={handleVerifyClick}
                        disabled={otp.length < 6}
                        className="mt-5 px-3 py-2 text-[.8rem] bg-accent-pink text-white font-bold bg-opacity-80 rounded-xl hover:bg-opacity-100 transition"
                    >
                        Verify
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EmailConfirmation