import React, { useEffect, useState } from "react";
// import { getHome } from "../utils/ApiFunctions.js";
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
  OverlayPanel,
  Paragraph,
  RightOverlayPanel,
  SignInContainer,
  SignUpContainer,
  Title,
} from "./Components.jsx";
import "./Login.css";
import { imageList } from "./images.js";
import { Link } from "react-router-dom";

const Login = () => {
  const [signIn, toggle] = React.useState(true);
  const [newHome, setNewHome] = useState("");

  const images = imageList;

//   useEffect(() => {
//     getHome().then((data) => {
//       setNewHome(data);
//     });
//   }, []);

  return (
    <>
    <Navbar />
      <Container>
        <SignUpContainer signinIn={signIn}>
          <Form>
            <Title>Create Account</Title>
            <Input type="text" placeholder="Full Name" />
            <Input type="text" placeholder="UserName" />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <Button>Sign Up</Button>
          </Form>
        </SignUpContainer>

        <SignInContainer signinIn={signIn}>
          <Form>
            <Title>Sign in</Title>
            <Input type="text" placeholder="Username" />
            <Input type="password" placeholder="Password" />
            <Anchor href="#">Forgot your password?</Anchor>

            <Button onClick={() => toggle(true)}>
              <Link to={`/feed`}>Sigin In</Link>
            </Button>
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
            alt={`Inclined Image ${index + 1}`}
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
