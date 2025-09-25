import React, { useState } from "react";
import OtpInput from "react-otp-input";
import "../styles/emailConfirmation.css"


type OTPVerificationProps = {
  otp: string;
  setOtp: (otp: string) => void;
};

function OTPVerification({ otp, setOtp }: OTPVerificationProps) {

  return (
    <div className="mt-5">
     <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        inputType="tel"
        renderSeparator={<span className="mx-2"></span>}
        inputStyle={{
          width: '2.5rem',
          height: '4rem',
          textAlign: 'center',
          border: '1px solid #ccc',
          borderRadius: '.5rem',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          fontSize: '25px',
        }}
        renderInput={(props) => (
          <input
            {...props}
            required
          />
        )}
      />
    </div>
    );
}

export default OTPVerification;
