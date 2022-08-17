import { Main } from "../styledComponents/authStyledComponents";
import React from "react";
import Banner from  "../Components/AuthComponents/Banner"
import RegisterComponent from "../Components/AuthComponents/RegisterComponent"

export default function RegisterPage() {

  return (
    <Main>
      <Banner></Banner>
      <RegisterComponent></RegisterComponent>
    </Main>
  );
}

