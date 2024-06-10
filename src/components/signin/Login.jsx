//import React, { useState } from "react";
import React, { useState }from "react";
import { useNavigate } from 'react-router-dom';
import APIFunctions from "../../utils/APIFunctions.js";
import Navbar from "./Navbar";
import './Navbar.css';
import {
  Anchor,
  Button,
  Container,
  Form,
  GhostButton,
  Input,
  LeftOverlayPanel,
  Overlay,
  OverlayContainer,
  Paragraph,
  RightOverlayPanel,
  SignInContainer,
  SignUpContainer,
  Title,
} from "./Components.jsx";
import "./Login.css";
import { imageList } from "./images.js";
//import { Link } from "react-router-dom";

const Login = () => {
  const [signIn, toggle] = React.useState(true);
  const [isSignUpLoading, setIsSignUpLoading] = React.useState(false);
  const [isSignInLoading, setIsSignInLoading] = React.useState(false);
  const [signUpError, setSignUpError] = React.useState(null);
  const [signInError, setSignInError] = React.useState(null);
  const [/**user*/, setUser] = useState(null);
  const navigate = useNavigate();
  //const [newHome, setNewHome] = useState("");

  const images = imageList;
  return (
    <>
    <Navbar />
      <Container>
        <SignUpContainer signinIn={signIn}>
          <Form>
            <Title>Create Account</Title>
            <Input type="text" placeholder="FullName" />
            <Input type="text" placeholder="UserName" />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />

          <Button
            onClick={() => {
              setIsSignUpLoading(true);
              const formData = {
                fullname: '',
                username: '',
                email: '',
                password: '',
              };
              APIFunctions.signup(formData)
                .then((response) => {
                  // Handle successful signup
                  setIsSignUpLoading(false);
                  // Add any additional logic to handle successful signup
                })
                .catch((error) => {
                  // Handle signup error
                  setSignUpError(error);
                  setIsSignUpLoading(false);
                });
            }}
            disabled={isSignUpLoading}
          >
            {isSignUpLoading ? 'Loading...' : 'Sign Up'}
          </Button>
          {signUpError && <div>Error: {signUpError.message}</div>}

          </Form>
        </SignUpContainer>

        <SignInContainer signinIn={signIn}>
          <Form>
            <Title>Sign in</Title>
            <Input type="text" placeholder="Username" />
            <Input type="password" placeholder="Password" />
            <Anchor href="#">Forgot your password?</Anchor>

          <Button
            onClick={() => {
              setIsSignInLoading(true);
              const formData = {
                username: '',
                password: '',
              };
              APIFunctions.login(formData)
                .then((response) => {
                  // Handle successful login
                  setIsSignInLoading(false);
                  // Update the application state with the user information
                  setUser(response.user);
                  // Navigate the user to the feed page
                  navigate('/feed');
                })
                .catch((error) => {
                  // Handle login error
                  setSignInError(error);
                  setIsSignInLoading(false);
                });
            }}
            disabled={isSignInLoading}
          >
            {isSignInLoading ? 'Loading...' : 'Sign In'}
          </Button>
          {signInError && <div>Error: {signInError.message}</div>}

          </Form>
        </SignInContainer>

        <OverlayContainer signinIn={signIn}>
          <Overlay signinIn={signIn}>
            <LeftOverlayPanel signinIn={signIn}>
              <Title>Welcome Back!</Title>
              <Paragraph>
                To keep connected with us please login with your personal info
              </Paragraph>
              <GhostButton onClick={() => toggle(true)}>Sign In</GhostButton>
            </LeftOverlayPanel>

            <RightOverlayPanel signinIn={signIn}>
              <Title>Hello, Friend!</Title>
              <Paragraph>
                Enter Your personal details and start journey with us
              </Paragraph>
              <GhostButton onClick={() => toggle(false)}>Sigin Up</GhostButton>
            </RightOverlayPanel>
          </Overlay>
        </OverlayContainer>
      </Container>

      <div className="image-container">
        {images.map((image, index) => (
          <img
            key={index}
            className="image"
            src={image}
            alt={`Inclined toff ${index + 1}`}
          />
        ))}
      </div>

      {/* <div>
        <h1>{newHome}</h1>
      </div> */}
    </>
  );
};

export default Login;
