import { Main } from "../styledComponents/authStyledComponents";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../Components/AuthComponents/Banner";
import LoginComponent from "../Components/AuthComponents/LoginComponent";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));
  let res;
  const checkToken = async () => {
    try {
      console.log(userData.token);
      const response = await axios.post(
        "https://projeto17-back.herokuapp.com/checkToken",
        {},
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      res = response.data;
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
