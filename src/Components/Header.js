import { BsChevronDown } from "react-icons/bs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Center, Head, MobileSearchBar  } from "../styledComponents/headerStyledComponents";
import { userData } from "../Scripts/constants";
import SearchBar from "./SearchBar";

export default function Header({ isLoading }) {
  const [logout, setLogout] = useState("false");
  const navigate = useNavigate();
  const ToggleLogout = () => {
    setLogout(!logout);
  };
  function logoutUser(){
    localStorage.clear()
    navigate("/")
  }

  return (
    <>
      <Head>
        <h1 onClick={() => navigate("/timeline")}>linkr</h1>
        <Center>
          <SearchBar isLoading={isLoading} />
        </Center>
        <div className="right" onClick={ToggleLogout}>
          <BsChevronDown color="#FFFFFF" size={"21px"} style={{ "cursor": 'pointer' }}/>
          <img src={userData.photo} alt="usuario" />
          <div className={`logout ${logout ? "logoutActive" : ""}`} onClick={logoutUser}>Logout</div>
        </div>
      </Head>
      <MobileSearchBar>
        <SearchBar isLoading={isLoading} />
      </MobileSearchBar>
    </>
  );
}