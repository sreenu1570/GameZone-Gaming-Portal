
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getUsers } from "../utils/storage";
import { useAuth } from "../context/Authcontext";

function ForgotPassword() {

  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  // Current recovery stage
  const [step, setStep] = useState(1);

  // Form data
  const [email, setEmail] = useState("");
  const [enteredOTP, setEnteredOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // OTP data
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [otpExpiry, setOtpExpiry] = useState(0);
  const [attempts, setAttempts] = useState(0);

  // Messages
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Generate six-digit OTP
  const generateOTP = () => {

    const randomValues = new Uint32Array(1);

    window.crypto.getRandomValues(randomValues);

    return String(
      100000 + (randomValues[0] % 900000)
    );
  };

  // STEP 1: Verify registered email
  const handleEmailSubmit = (e) => {

    e.preventDefault();

    setError("");
    setMessage("");

    const normalizedEmail = email.trim().toLowerCase();

    // Admin account is handled separately
    if (normalizedEmail === "admin@gamezone.com") {
      setError("Admin password recovery is not available here.");
      return;
    }

    const users = getUsers();

    const userExists = users.some(
      (user) => user.email === normalizedEmail
    );

    if (!userExists) {
      setError("No registered account found with this email.");
      return;
    }

    const otp = generateOTP();

    setGeneratedOTP(otp);

    // OTP valid for five minutes
    setOtpExpiry(Date.now() + 5 * 60 * 1000);

    setAttempts(0);
    setEnteredOTP("");

    setEmail(normalizedEmail);
    setStep(2);

  };

  // STEP 2: Verify OTP
  const handleOTPSubmit = (e) => {

    e.preventDefault();

    setError("");
    setMessage("");

    if (Date.now() > otpExpiry) {
      setError("OTP expired. Please generate a new OTP.");
      return;
    }

    if (attempts >= 5) {
      setError("Maximum attempts reached. Generate a new OTP.");
      return;
    }

    if (enteredOTP.trim() !== generatedOTP) {

      setAttempts((previous) => previous + 1);

      setError(
        `Incorrect OTP. Attempts remaining: ${4 - attempts}`
      );

      return;
    }

    setGeneratedOTP("");
    setStep(3);

  };

  // RESEND OTP
  const handleResendOTP = () => {

    const otp = generateOTP();

    setGeneratedOTP(otp);
    setOtpExpiry(Date.now() + 5 * 60 * 1000);

    setAttempts(0);
    setEnteredOTP("");

    setError("");
    setMessage("A new demo OTP has been generated.");

  };

  // STEP 3: Reset password
  const handlePasswordReset = (e) => {

    e.preventDefault();

    setError("");
    setMessage("");

    if (newPassword.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const success = resetPassword(
      email,
      newPassword
    );

    if (success) {

      setMessage("Password reset successful!");

      setTimeout(() => {
        navigate("/");
      }, 1200);

    } else {

      setError("Unable to reset password. Please try again.");

    }

  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h1>🎮 GameZone</h1>

        <h2>Forgot Password</h2>

        <p className="recovery-subtitle">
          Recover access to your account
        </p>

        {/* STEP 1 */}
        {step === 1 && (

          <form onSubmit={handleEmailSubmit}>

            <h3>Verify Your Email</h3>

            <input
              type="email"
              placeholder="Enter registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit">
              Generate OTP
            </button>

          </form>

        )}

        {/* STEP 2 */}
        {step === 2 && (

          <form onSubmit={handleOTPSubmit}>

            <h3>OTP Verification</h3>

            <p>
              Account: {email}
            </p>

            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              value={enteredOTP}
              onChange={(e) =>
                setEnteredOTP(
                  e.target.value.replace(/\D/g, "")
                )
              }
              required
            />

            {/* DEMO OTP DISPLAY */}
            <div className="demo-otp">

              <p>Demo OTP</p>

              <h2>{generatedOTP}</h2>

              <small>
                Valid for 5 minutes
              </small>

            </div>

            <button type="submit">
              Verify OTP
            </button>

            <button
              type="button"
              className="secondary-btn"
              onClick={handleResendOTP}
            >
              Generate New OTP
            </button>

            <p className="attempt-info">
              Attempts used: {attempts}/5
            </p>

          </form>

        )}

        {/* STEP 3 */}
        {step === 3 && (

          <form onSubmit={handlePasswordReset}>

            <h3>Create New Password</h3>

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              minLength={6}
              required
            />

            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              minLength={6}
              required
            />

            <button type="submit">
              Reset Password
            </button>

          </form>

        )}

        {/* ERROR MESSAGE */}
        {error && (
          <p className="error">{error}</p>
        )}

        {/* SUCCESS MESSAGE */}
        {message && (
          <p className="success-message">
            {message}
          </p>
        )}

        <p className="back-login">
          <Link to="/">
            ← Back to Login
          </Link>
        </p>

      </div>

    </div>

  );

}

export default ForgotPassword;
