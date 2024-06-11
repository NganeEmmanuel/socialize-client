import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
//import APIFunctions from "../../utils/APIFunctions.js";
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
import AuthService from './AuthService';

const Login = () => {
  const [signIn, toggle] = React.useState(true);
  const [isSignUpLoading, setIsSignUpLoading] = React.useState(false);
  const [isSignInLoading, setIsSignInLoading] = React.useState(false);
  const [signUpError, setSignUpError] = React.useState(null);
  const [signInError, setSignInError] = React.useState(null);
  const [/**user*/, setUser] = useState(null);
  const navigate = useNavigate();

  const fullnameRef = useRef(null);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const images = imageList;

  const handleSignup = async () => {
    setIsSignUpLoading(true);

    try {
      const response = await AuthService.signup({
        fullname: fullnameRef.current.value,
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      // Handle successful signup
      // Add any additional logic to handle successful signup
    } catch (error) {
      setSignUpError(error);
    } finally {
      setIsSignUpLoading(false);
    }
  };

  const handleLogin = async () => {
    setIsSignInLoading(true);

    try {
      const response = await AuthService.login({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });

      // Update the application state with the user information
      setUser(response.user);
      navigate('/feed');
    } catch (error) {
      setSignInError(error);
    } finally {
      setIsSignInLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <SignUpContainer signinIn={signIn}>
          <Form>
            <Title>Create Account</Title>
            <Input type="text" placeholder="FullName" ref={fullnameRef} />
            <Input type="text" placeholder="UserName" ref={usernameRef} />
            <Input type="email" placeholder="Email" ref={emailRef} />
            <Input type="password" placeholder="Password" ref={passwordRef} />
            <Button onClick={handleSignup} disabled={isSignUpLoading}>
              {isSignUpLoading ? 'Loading...' : 'Sign Up'}
            </Button>
            {signUpError && <div>Error: {signUpError.message}</div>}
          </Form>
        </SignUpContainer>

        <SignInContainer signinIn={signIn}>
          <Form>
            <Title>Sign in</Title>
            <Input type="text" placeholder="Username" ref={usernameRef} />
            <Input type="password" placeholder="Password" ref={passwordRef} />
            <Anchor href="#">Forgot your password?</Anchor>
            <Button onClick={handleLogin} disabled={isSignInLoading}>
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
    </>
  );
};

export default Login;