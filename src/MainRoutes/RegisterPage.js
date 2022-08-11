import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RegisterForms from "../Components/AuthComponents/RegisterForms";
import { Main } from "../styledComponents/authStyledComponents";

export default function RegisterPage() {
  const navigate = useNavigate();
  return (
    <Main>
      <header>
        <h1>linkr</h1>
        <h2>save, share and discover the best links on the web</h2>
      </header>
      <RegisterForms />
      <Link to={"/"}> Switch back to log in </Link>
    </Main>
  );
}

