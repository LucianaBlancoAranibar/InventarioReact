// LoginForm.jsx
import React, { useState } from 'react';

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    const loginDetails = { email, password };

    try {
      const response = await fetch('https://localhost:7010/api/Usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginDetails),
      });

      if (!response.ok) {
        throw new Error('Login failed. Please check your credentials.');
      }

      const { token } = await response.json();
      onLoginSuccess(token);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      {errorMessage && <div>{errorMessage}</div>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
