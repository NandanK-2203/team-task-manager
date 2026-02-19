import React, { useState } from "react";
import axios from "axios";
import "../App.css";

function Login({ setToken }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async () => {
    try {
      if (isRegister) {
        // REGISTER
        const res = await axios.post(
          "http://localhost:5000/api/users/register",
          {
            name: name.trim(),
            email: email.trim(),
            password: password.trim(),
          }
        );

        setToken(res.data.token);
        alert("Registration Successful ✅");
      } else {
        // LOGIN
        const res = await axios.post(
          "http://localhost:5000/api/users/login",
          {
            email: email.trim(),
            password: password.trim(),
          }
        );

        setToken(res.data.token);
        alert("Login Successful ✅");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h3>{isRegister ? "Register" : "Login"}</h3>

      {isRegister && (
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="primary-btn" onClick={submitHandler}>
        {isRegister ? "Register" : "Login"}
      </button>

      <br /><br />

      <button
        className="secondary-btn"
        onClick={() => setIsRegister(!isRegister)}
      >
        {isRegister
          ? "Already have an account? Login"
          : "New user? Register"}
      </button>
    </div>
  );
}

export default Login;
