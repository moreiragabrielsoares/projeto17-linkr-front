import { BsChevronDown } from "react-icons/bs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Center, Head, MobileSearchBar  } from "../styledComponents/headerStyledComponents";
import { userData } from "../Scripts/constants";
import SearchBar from "./SearchBar";

export default function Header({ isLoading, isFollowing }) {
  const [search, setSearch] = useState("");
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
          <SearchBar
            isLoading={isLoading}
            isFollowing={isFollowing}
            search={search}
            setSearch={setSearch}
          />
        </Center>
        <div className="right">
          <BsChevronDown onClick={ToggleLogout} color="#FFFFFF" size={"21px"} style={{ "cursor": 'pointer' }}/>
          <img src={userData.photo} alt="usuario" onClick={() => navigate(`/user/${userData.userId}`)}/>
          <div className={`logout ${logout ? "logoutActive" : ""}`} onClick={logoutUser}>Logout</div>
        </div>
      </Head>
      <MobileSearchBar>
        <SearchBar
          isLoading={isLoading}
          isFollowing={isFollowing}
          search={search}
          setSearch={setSearch}
        />
      </MobileSearchBar>
    </>
  );
}