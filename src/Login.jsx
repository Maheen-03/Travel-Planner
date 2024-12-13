import React, { useState } from 'react';
import './App.css'; // Make sure to include your CSS file for styling
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');

  // Create a navigate function using the useNavigate hook
  const navigate = useNavigate();

  // Email regex for basic validation
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  // Password regex to check for at least one digit and 6+ characters
  const passwordRegex = /^(?=.*\d).{6,}$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    setEmailError('');
    setPasswordError('');
    setFormError('');

    // Email validation
    if (!email || !emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    // Password validation
    if (!password || !passwordRegex.test(password)) {
      setPasswordError('Password must be at least 6 characters long and contain a number');
      return;
    }

    // Proceed with login
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('Login successful!');
        navigate('/dashboard'); // Redirect to dashboard after successful login
      })
      .catch((err) => {
        let errorMessage = 'Incorrect email or password, please try again.';
        if (err.code === 'auth/wrong-password') {
          errorMessage = 'Incorrect password. Please try again.';
        } else if (err.code === 'auth/user-not-found') {
          errorMessage = 'No user found with this email address.';
        }
        setFormError(errorMessage);
      });
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label htmlFor="email">Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p className="error-text">{emailError}</p>}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <p className="error-text">{passwordError}</p>}

        <button className="Link" type="submit">
          Login
        </button>

        {formError && <p className="error-text">{formError}</p>}

        <br />
        <p>Don't have an account? </p>
        <Link to="/">Sign Up</Link>
      </form>
    </div>
  );
};

export default Login;
