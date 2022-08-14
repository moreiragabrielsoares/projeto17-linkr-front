import { Main } from "../styledComponents/authStyledComponents";
import React from "react";
import { useNavigate } from "react-router-dom";
import Banner from  "../Components/AuthComponents/Banner"
import RegisterComponent from "../Components/AuthComponents/RegisterComponent"

export default function RegisterPage() {
  const navigate = useNavigate();

  return (
    <Main>
      <Banner></Banner>
      <RegisterComponent></RegisterComponent>
    </Main>
  );
}

