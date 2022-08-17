import React from "react";
import LoginForms from "./LoginForms";
import { Link } from "react-router-dom";
import { Container } from "../../styledComponents/authStyledComponents";

export default function LoginComponent() {

  return (
    <Container>
      <header>
        <h1>linkr</h1>
        <h2>save, share and discover the best links on the web</h2>
      </header>
      <LoginForms />
      <Link to={"/signup"}> First time? Create an account!</Link>
    </Container>
  );
}
