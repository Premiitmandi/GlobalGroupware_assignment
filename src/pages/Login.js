import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/users");
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
      <a href="#" className="forgot-password">
        Forgot your password?
      </a>

      {/* Inline CSS */}
      <style jsx>{`
        /* Login Page Styles */
        .login-container {
          max-width: 400px;
          width: 100%;
          background-color: #ffffff;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          text-align: center;
          margin-top: 50px;
        }

        .login-container h2 {
          font-size: 2rem;
          margin-bottom: 20px;
          color: #333;
        }

        .login-container input {
          width: 100%;
          padding: 12px;
          margin: 12px 0;
          border-radius: 5px;
          border: 1px solid #ddd;
          font-size: 1rem;
          transition: all 0.3s;
        }

        .login-container input:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
        }

        .login-container button {
          width: 100%;
          padding: 12px;
          border-radius: 5px;
          border: none;
          background-color: #007bff;
          color: white;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .login-container button:hover {
          background-color: #0056b3;
        }

        .login-container .error {
          color: red;
          font-size: 1rem;
          margin-top: 10px;
        }

        .login-container .forgot-password {
          display: block;
          color: #007bff;
          margin-top: 10px;
          text-decoration: none;
        }

        .login-container .forgot-password:hover {
          text-decoration: underline;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .login-container {
            margin-top: 30px;
            padding: 30px;
          }

          .login-container h2 {
            font-size: 1.6rem;
          }

          .login-container input,
          .login-container button {
            font-size: 1rem;
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
