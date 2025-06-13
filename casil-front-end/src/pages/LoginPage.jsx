import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button'; 
import "../styles/LoginPage.css";
import { loginUser } from '../services/UserService'; 

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();

  
  if (!email || !password) {
    setError("Please fill in both email and password.");
    return;
  }

  try {
    const { data } = await loginUser({ email, password });
    console.log("Login successful: ", data);

    localStorage.setItem("token", data.token);
    localStorage.setItem("firstName", data.firstName);
    localStorage.setItem("type", data.type);

    navigate("/dashboard", {
      state: {
        firstName: data.firstName,
        type: data.type,
      },
    });
  } catch (err) {
    console.error(
      "Login failed: ",
      err.response?.data?.message || err.message
    );
    setError(
      err.response?.data?.message || "Login failed. Please try again."
    );
  }
};

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="login-container">
            {/* Back Button */}
            <button className="back-button" onClick={handleBack}>Back</button>

            <form className="loginForm" onSubmit={handleLogin}>
                <h2>Login</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder='Enter your email'
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder='Enter your password'
                    />
                </div>
                <Button type="submit">Login</Button>

            </form>

            {/* Signup link */}
            <p>Don’t have an account? <span className="signup-link" onClick={handleRegisterRedirect}>Signup</span></p>
        </div>
    );
}

export default LoginPage;
