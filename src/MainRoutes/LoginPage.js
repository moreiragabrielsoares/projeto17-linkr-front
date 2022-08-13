import { Main } from "../styledComponents/authStyledComponents";
import React from "react";
import LoginForms from "../Components/AuthComponents/LoginForms";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <Main>
      <header>
        <h1>linkr</h1>
        <h2>save, share and discover the best links on the web</h2>
      </header>
      <LoginForms />
      <Link to={"/signup"}> First time? Create an account!</Link>
    </Main>
  );
}
