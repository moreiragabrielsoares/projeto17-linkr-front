import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import UserPosts from "../Components/UserPosts";

export default function UserPage() {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const response = axios.get(`http://localhost:5000/user/${ id }`);
    
    response.then((r) => {
      setUser({ ...r.data });
    }).catch((r) => {
      alert(`Erro ${ r.response.status }!`);
    });
  }, [id]);

  return (
    <Main>
      <div className="container">
        <div className="left-side">
          <div className="top">
            <img src={ user.userPhoto } alt="" />
            <h1>{ user.name }'s posts</h1>
          </div>
          <UserPosts user={ user } />
        </div>
        <div className="right-side">
          {/* <Trendings /> */}
        </div>
      </div>
    </Main>
  );
}

const Main = styled.main`
  background-color: #333333;

  width: 100%;
  height: 100vh;

  .container {
    width: 90%;
    padding-top: 132px;

    display: flex;
    justify-content: center;
  }

  .left-side {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    img {
      border-radius: 50%;
      object-fit: cover;

      width: 50px;
      height: 50px;
    }

    .top {
      margin-left: 18px;
      display: flex;

      h1 {
        color: #FFFFFF;
        font-family: "Oswald";
        font-size: 43px;
        font-weight: 700;
        margin-left: 18px;
      }
    }
  }
`;