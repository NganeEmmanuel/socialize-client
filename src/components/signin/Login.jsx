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
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';

const LOGIN_URL = '/auth';

const Login = () => {
  const [signIn, toggle] = React.useState(true);

  const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    
  const images = imageList;
  return (
    <>
    <Navbar />
      <Container>
        <SignUpContainer signinIn={signIn}>
          <Form onSubmit={handleSubmit}>
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
          <Form onSubmit={handleSubmit}>
            <Title>Sign in</Title>
            <Input type="text" placeholder="Username" id="username" ref={userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)}   value={user} required/>
            <Input type="password" placeholder="Password" id="password"  onChange={(e) => setPwd(e.target.value)} value={pwd} required />
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
