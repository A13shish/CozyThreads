// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { auth } from "../../fireabase/FirebaseConfig"; 
import { RecaptchaVerifier, signInWithPhoneNumber, sendSignInLinkToEmail } from "firebase/auth";

const OtpAuth = () => {
  const [input, setInput] = useState(""); // Handles both email & phone input
  const [method, setMethod] = useState("email"); // Toggle between email or phone
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  // Setup Recaptcha for phone authentication
  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      { size: "invisible" },
      auth
    );
  };

  // 📩 Send Sign-In Link to Email
  const sendEmailLink = () => {
    const actionCodeSettings = {
      url: "http://localhost:3000/", // Change this to your domain
      handleCodeInApp: true,
    };

    sendSignInLinkToEmail(auth, input, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem("emailForSignIn", input);
        alert("Sign-in link sent! Check your email.");
      })
      .catch((error) => {
        console.error("Error sending email link", error);
      });
  };

  // 📲 Send OTP to Phone
  const sendOtp = () => {
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, input, appVerifier)
      .then((confirmation) => {
        setConfirmationResult(confirmation);
        alert("OTP sent to your phone.");
      })
      .catch((error) => {
        console.error("Error sending OTP", error);
      });
  };

  // ✅ Verify OTP
  const verifyOtp = () => {
    if (confirmationResult) {
      confirmationResult
        .confirm(otp)
        .then((result) => {
          console.log("User signed in successfully", result.user);
        })
        .catch((error) => {
          console.error("OTP verification failed", error);
        });
    }
  };

  return (
    <div>
      <h2>Choose Login Method</h2>
      <select onChange={(e) => setMethod(e.target.value)} value={method}>
        <option value="email">Email</option>
        <option value="phone">Phone</option>
      </select>

      <input
        type={method === "email" ? "email" : "tel"}
        placeholder={method === "email" ? "Enter your email" : "Enter your phone number"}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {method === "email" ? (
        <button onClick={sendEmailLink}>Send Sign-In Link</button>
      ) : (
        <button onClick={sendOtp}>Send OTP</button>
      )}

      {method === "phone" && (
        <>
          <div id="recaptcha-container"></div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}
    </div>
  );
};

export default OtpAuth;
