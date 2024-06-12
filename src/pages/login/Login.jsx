import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../utils/APIFunctions";
import { AuthContext } from "../../context/authContext";
import "./login.scss"; // I

const Login = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(username, password, authLogin, navigate);
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
          Welcome to Socialize, the premier social network for connecting with friends, family, and like-minded individuals. Log in to access a world of shared experiences, vibrant conversations, and meaningful connections.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
