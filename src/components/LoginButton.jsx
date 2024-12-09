import React from 'react';
import './LoginButton.css'; // Import the CSS file for styling

export default function LoginButton() {
  const handleLogin = () => {
    // Implement login logic here
    console.log('Login button clicked');
  };

  return (
    <button className="login-button" onClick={handleLogin}>Login</button>
  );
}