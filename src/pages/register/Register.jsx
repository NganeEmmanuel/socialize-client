import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../utils/APIFunctions";
import "./register.scss"; // Import the styles

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState(""); // State to hold success or error messages

  const handleSignup = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      username: username,
      password: password
    };
    console.log(data);
    try {
      const rep = await signup(data);
      if (rep.status === 200) {
        setMessage("Successfully registered! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 5000); // Redirect after 5 seconds
      } else {
        setMessage("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Social</h1>
          <p>
            Become social with the Socialise social media web, meet people, interact with them, and have fun.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleSignup}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <button type="submit">Register</button>
          </form>
          {message && <p>{message}</p>} {/* Display success or error message */}
        </div>
      </div>
    </div>
  );
};

export default Signup;
