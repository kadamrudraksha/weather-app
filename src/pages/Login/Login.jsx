import React, { useState } from 'react';
import './Login.css';
import { toast } from 'react-toastify';
import { signup, login, auth, logout } from '../../config/firebase'; // Correct import
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [currState, setCurrState] = useState("Sign Up");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currState === "Sign Up") {
        await signup(userName, email, password);
        toast.success("Account created successfully!");
      } else {
        await login(email, password);
        toast.success("Logged in successfully!");
        navigate('/weather'); // Navigate to /weather page on successful login
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login">
      <form className="login-form" onSubmit={onSubmitHandler}>
        <h2>{currState}</h2>
        
        {currState === "Sign Up" && (
          <h5>
            Name:
            <input
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              type="text"
              placeholder="Username"
              required
            />
          </h5>
        )}
        
        <h5>
          Email:
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            required
          />
        </h5>

        <h5>
          Password:
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            required
          />
        </h5>

        <div className="checkbox">
          <input type="checkbox" required />
          <p>Agree to all terms and conditions</p>
        </div>

        <button type="submit">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className="login-forgot">
          {currState === "Sign Up" ? (
            <p>
              Already have an account?{" "}
              <span onClick={() => setCurrState("Login")}>Login here</span>
            </p>
          ) : (
            <p>
              Create an Account{" "}
              <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
