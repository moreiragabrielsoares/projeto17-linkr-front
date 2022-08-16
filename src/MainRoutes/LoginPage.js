import { Main } from "../styledComponents/authStyledComponents";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../Components/AuthComponents/Banner";
import LoginComponent from "../Components/AuthComponents/LoginComponent";
import axios from "axios";
import { backUrl, config, userData } from "../Scripts/constants";

export default function LoginPage() {
  const navigate = useNavigate();
  const checkToken = async () => {
    try {
      const response = await axios.post(
        `${backUrl}checkToken`,
        {},
        config
      );
      const res = response.data;
      if (userData && res) {
        navigate("/timeline");
      }
    } catch (err) {
      if (err.response?.status === 500) {
        localStorage.clear();
      }
    }
  };

  useEffect(
    (userData) => {
      if (localStorage.length !== 0) {
        checkToken(userData);
      }
    },
    [userData]
  );
  

  return (
    <Main>
      <Banner></Banner>
      <LoginComponent></LoginComponent>
    </Main>
  );
}
