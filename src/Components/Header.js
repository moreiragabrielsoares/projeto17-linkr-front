import { BsChevronDown } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Center, Head, MobileSearchBar  } from "../styledComponents/headerStyledComponents";
import { userData, backUrl } from "../Scripts/constants";

export default function Header({ isLoading }) {
  const [search, setSearch] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [logout, setLogout] = useState("false");
  const [showSearchUsers, setShowSearchUsers] = useState(false);
  const navigate = useNavigate();
  const ToggleLogout = () => {
    setLogout(!logout);
  };
  function logoutUser(){
    localStorage.clear()
    navigate("/")
  }

  useEffect(() => {
    if (search.length >= 3) {
      const response = axios.get(
        `${backUrl}user?user=${search}`
      );

      response
        .then((r) => {
          setUsersList([...r.data]);
          setShowSearchUsers(true);
        })
        .catch((r) => {
          alert(`Erro ${r.response.status}!`);
        });
    } else if (search.length < 3) {
      setUsersList([]);
      setShowSearchUsers(false);
    }
  }, [search]);

  return (
    <>
      <Head>
        <h1 onClick={() => navigate("/timeline")}>linkr</h1>
        <Center>
          <div className="bar">
            <DebounceInput
              type="text"
              placeholder="Search for people"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              debounceTimeout={300}
              disabled={isLoading}
            />

            <button>
              <AiOutlineSearch color="#C6C6C6" size={"21px"} />
            </button>
          </div>
          {showSearchUsers ? (
            <div className="list-user">
              {usersList.length >= 1 ? (
                usersList.map((userData, index) => (
                  <div
                    className="user"
                    key={index}
                    onClick={() => {
                      setSearch("");
                      navigate(`/user/${userData.id}`);
                    }}
                  >
                    <img src={userData.userPhoto} alt="" />
                    <h2>{userData.name}</h2>
                  </div>
                ))
              ) : (
                <h3>There are no users with this name</h3>
              )}
            </div>
          ) : (
            <></>
          )}
        </Center>
        <div className="right" onClick={ToggleLogout}>
          <BsChevronDown color="#FFFFFF" size={"21px"} style={{ "cursor": 'pointer' }}/>
          <img src={userData.photo} alt="usuario" />
          <div className={`logout ${logout ? "logoutActive" : ""}`} onClick={logoutUser}>Logout</div>
        </div>
      </Head>
      <MobileSearchBar>
        <div className="bar">
          <DebounceInput
            type="text"
            placeholder="Search for people"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            debounceTimeout={300}
            disabled={isLoading}
          />
          <button>
            <AiOutlineSearch color="#C6C6C6" size={"21px"} />
          </button>
        </div>
        {showSearchUsers ? (
          <div className="list-user">
            {usersList.length >= 1 ?
              usersList.map((userData, index) => (
                <div
                  className="user"
                  key={index}
                  onClick={() => {
                    setSearch("");
                    navigate(`/user/${userData.id}`);
                  }}
                >
                  <img src={userData.userPhoto} alt="" />
                  <h2>{userData.name}</h2>
                </div>
              ))
            :
              <h3>There are no users with this name</h3>
            }
          </div>
        ) : (
          <></>
        )}
      </MobileSearchBar>
    </>
  );
}