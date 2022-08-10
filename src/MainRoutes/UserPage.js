import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import UserPosts from "../Components/UserPosts";

export default function UserPage() {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const response = axios.get(`https://projeto17-back.herokuapp.com/user/${id}`);

    response.then((r) => {
      setUser({...r.data});
    }).catch((r) => {
      alert(`Erro ${r.response.status}!`);
    });
  }, [id]);

  return (
    <Main>
      <h1>{user.name}'s posts</h1>
      <UserPosts posts={user.posts} />
      <Trendings />
    </Main>
  );
}

const Main = styled.main`

`;