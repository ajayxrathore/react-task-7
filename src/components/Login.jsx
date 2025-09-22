import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate()
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const admin = {
    userId: "admin",
    password: "admin",
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId === admin.userId && password === admin.password) {
      navigate('/admin')

      setError("");
    } else {
      setError("Invalid Credentials");
    }
  };
  return (
    <>
      <div className="login-container">
        <form onSubmit={handleSubmit}className="login-form">
          <h2 className="login-title"> Login</h2>
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
             className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="login-button">Login</button>
          {error && <p className="login-error">{error}</p>}
        </form>
      </div>
    </>
  );
}

export default Login;
