import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";

import Header from "../Components/Header";
import ListPosts from "../Components/ListPosts";

export default function UserPage() {
  const { id } = useParams();
  const [userPosts, setUserPosts] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const response = axios.get(`https://projeto17-back.herokuapp.com/user/${ id }`);
    
    response.then((r) => {
      setUserPosts([...r.data]);
      setIsLoading(false);
    }).catch((r) => {
      alert(`Erro ${ r.response.status }!`);
      setIsLoading(false);
    });
  }, [id]);

  return (
    <>
      <Header isLoading={ isLoading } />
      <Main isLoading={ isLoading }>
        {isLoading ? 
          <ThreeCircles color={"#FFFFFF"}/> 
          : 
          <Container>
            <div className="left-side">
              <div className="top">
                <img src={ userPosts[0].userPhoto } alt="" />
                <h1>{ userPosts[0].userName }'s posts</h1>
              </div>
               {userPosts[0].postId ?
                  <ListPosts posts={ userPosts } />
                :
                  <div className="no-posts">
                    <h2>There are no posts yet.</h2>
                  </div>
                }
            </div>
            <div className="right-side">
              {/* <Trendings /> */}
            </div>
          </Container>
        }
      </Main>
    </>
  );
}

const Main = styled.main`
  background-color: #333333;

  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: ${({isLoading}) => isLoading ? "center" : "inherit"};
`;

const Container = styled.div`
  width: 90%;
  padding-top: 132px;

  display: flex;
  justify-content: center;

  .left-side {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    width: 70%;

    .top {
      margin-left: 18px;
      display: flex;

      img {
        border-radius: 50%;
        object-fit: cover;

        width: 50px;
        height: 50px;
      }

      h1 {
        color: #FFFFFF;
        font-family: "Oswald";
        font-size: 43px;
        font-weight: 700;
        margin-left: 18px;
      }
    }

    .no-posts {
      margin-left: 18px;

      h2 {
        color: #FFFFFF;
        font-family: "Lato";
        font-size: 20px;
        font-weight: 400;

        margin-top: 35px;
        margin-left: 18px;
      }
    }
  }

  .right-side {
    width: 30%;
  }

  @media screen and (max-width: 900px) {
    .right-side {
      display: none;
    }

    .left-side {
      width: 100%;
    }
  }

  @media screen and (max-width: 720px) {
    width: 100%;
  }
`;