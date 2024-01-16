import { Link } from "react-router-dom";
import "./register.css";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("https://backblog-qx9z.onrender.com/api/auth/register", {
        username,
        email,
        password
      });
      res.data && window.location.replace("https://backblog-qx9z.onrender.com/api/login");
    } catch (error) {
      setError(true);
      // console.log(error);
    }
  }

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>E-mail</label>
        <input
          className="registerInput"
          type="email"
          placeholder="email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="registerButtons">
          <button className="registerButton" type="submit">Register</button>
          <Link className="link" to={"/login"}>
            <div className="registerButtons">
              <button className="registerLoginButton">Login</button>
            </div>
          </Link>
        </div>
      </form>
      {error && <span style={{color:"brown"}}>Something went wrong!</span>}
    </div>
  );
}
