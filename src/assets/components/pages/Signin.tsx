import "./signin.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
interface SigninProps {
  setLogin: (status: boolean) => void;
}
const Signin: React.FC<SigninProps> = ({ setLogin }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation logic (replace with your actual logic)
    if (email === "abc@gmail.com" && password === "123") {
      console.log("Validation successful! Redirecting...");
      setLogin(true);
      navigate("/dashboard"); // Rediect to the Home page
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="text-center" id="siginbody">
      <main className="form-signin">
        <form onSubmit={handleLogin}>
          <img
            className="mb-4"
            src="../src/bootstrap-logo.svg"
            alt=""
            width="72"
            height="57"
          />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating">
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
          <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
        </form>
      </main>
    </div>
  );
};

export default Signin;
