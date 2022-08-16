import React from "react";
import { Link } from "react-router-dom";
import { Container } from "../../styledComponents/authStyledComponents";
import RegisterForms from "./RegisterForms";

export default function RegisterComponent() {
  return (
    <Container>
      <header>
        <h1>linkr</h1>
        <h2>save, share and discover the best links on the web</h2>
      </header>
      <RegisterForms />
      <Link to={"/"}> Switch back to log in </Link>
    </Container>
  );
}

