import { Main } from "../styledComponents/authStyledComponents";
import React from "react";
import { useNavigate } from "react-router-dom";
import Banner from  "../Components/AuthComponents/Banner"
import LoginComponent from "../Components/AuthComponents/LoginComponent"

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <Main>
      <Banner></Banner>
      <LoginComponent></LoginComponent>
    </Main>
  );
}
