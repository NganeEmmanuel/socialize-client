import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { login as loginUser } from "../../utils/APIFunctions";
import "./login.scss";

const Login = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { username, password };

    try {
      const response = await loginUser(data);
      if (response.status === 200) {
        await authLogin(response.data); // Update currentUser in AuthContext upon successful login
        navigate("/"); // Redirect to home page after successful login
      } else {
        setMessage("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setMessage("Login failed. Please try again.");
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>Welcome to Socialize...</p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
          {message && <p style={{ color: message.includes("Successfully") ? "green" : "red" }}>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
