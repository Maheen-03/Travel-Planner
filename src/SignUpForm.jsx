// import React, { useState } from 'react';
// import './App.css'; // Make sure to include your CSS file for styling
// import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
// import { auth } from './firebase';
// import { createUserWithEmailAndPassword } from 'firebase/auth';

// const SignUpForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [formError, setFormError] = useState('');

//   // Create a navigate function using the useNavigate hook
//   const navigate = useNavigate();

//   // Email regex for basic validation
//   const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//   // Password regex to check for at least one digit and 6+ characters (you can adjust this)
//   const passwordRegex = /^(?=.*\d).{6,}$/;

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Reset errors
//     setEmailError('');
//     setPasswordError('');
//     setFormError('');

//     // Email validation
//     if (!email || !emailRegex.test(email)) {
//       setEmailError('Please enter a valid email address');
//       return;
//     }

//     // Password validation
//     if (!password || !passwordRegex.test(password)) {
//       setPasswordError('Password must be at least 6 characters long and contain a number');
//       return;
//     }

//     // Proceed with account creation
//     try {
//       createUserWithEmailAndPassword(auth, email, password)
//         .then(() => {
//           console.log('Account created successfully!');
//           // Redirect to the login page after successful signup
//           navigate('/login'); // Use navigate() to redirect to the login page
//         })
//         .catch((err) => {
//           setFormError(err.message); // Display error message from Firebase
//         });
//     } catch (err) {
//       setFormError('An error occurred during signup, please try again.');
//       console.log(err);
//     }
//   };

//   return (
//     <div className="signup-container">
//       <form className="signup-form" onSubmit={handleSubmit}>
//         <h2>Sign Up</h2>

//         <label htmlFor="email">Email</label>
//         <input
//           type="text"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         {emailError && <p className="error-text">{emailError}</p>}

//         <label htmlFor="password">Password</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         {passwordError && <p className="error-text">{passwordError}</p>}

//         <button className="Link" type="submit">
//           Sign Up
//         </button>

//         {formError && <p className="error-text">{formError}</p>}

//         <br />
//         <p>Already have an account? </p>
//         <Link to="login">Login</Link>
//       </form>
//     </div>
//   );
// };

// export default SignUpForm;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');

  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const passwordRegex = /^(?=.*\d).{6,}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setFormError('');

    if (!email || !emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    if (!password || !passwordRegex.test(password)) {
      setPasswordError('Password must be at least 6 characters long and contain a number');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('Account created successfully!');
        navigate('/login');
      })
      .catch((err) => {
        setFormError(err.message);
      });
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold">Sign Up</h2>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
        </div>

        <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Sign Up
        </button>

        {formError && <p className="text-red-500 text-sm mt-4">{formError}</p>}

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
