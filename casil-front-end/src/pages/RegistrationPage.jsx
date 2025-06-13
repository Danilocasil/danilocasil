import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import "../styles/RegistrationPage.css";
import { createUser } from "../services/UserService";

function RegisterPage() {
  const navigate = useNavigate();
 
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [isActive, setIsActive] = useState(true);
 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
 
const handleRegister = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  console.log("Selected type:", type); 

  const userData = {
    firstName,
    lastName,
    age,
    gender,
    type,
    contactNumber,
    email,
    username,
    password,
    address,
    isActive,
  };

  try {
    const response = await createUser(userData);
    console.log("Registration successful:", response.data);
    setLoading(false);
    navigate("/login");
  } catch (err) {
    setLoading(false);
    setError(
      err.response?.data?.message ||
      "Registration failed. Please try again."
    );
  }
};


  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleBack = () => {
    navigate('/'); 
  };

  return (
    <>
      <button className="back-button" onClick={handleBack}>Back</button>

      <div className="registration-container">
        <form className="loginForm" onSubmit={handleRegister}>
          <h2>Register</h2>

          <div>
            <label htmlFor="firstname">First Name:</label>
            <input
              type="text"
              id="firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="Enter your first name"
            />
          </div>
          <div>
            <label htmlFor="lastname">Last Name:</label>
            <input
              type="text"
              id="lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder="Enter your last name"
            />
          </div>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="age">Age:</label>
            <input
              type="text"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              placeholder="Enter your age"
            />
          </div>
          <div>
            <label htmlFor="gender">Gender:</label>
            <input
              type="text"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              placeholder="Enter your gender"
            />
          </div>
          
          <div>
         <label htmlFor="type">Role:</label>
         <select
            id="type"
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
         > 
            <option value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>

       </div>


          <div>
            <label htmlFor="contactNumber">Contact Number:</label>
            <input
              type="text"
              id="contactNumber"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
              placeholder="Enter your contact number"
            />
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="Enter your address"
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
              placeholder="Enter your password"
            />
          </div>

          <input type="hidden" value={isActive} readOnly />

          {error && <p className="error-message">{error}</p>}

          <Button
            className="register-button"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        <p className="login-redirect">
          Already have an account? <span className="login-link" onClick={handleLoginRedirect}>Login</span>
        </p>
      </div>
    </>
  );
}

export default RegisterPage;