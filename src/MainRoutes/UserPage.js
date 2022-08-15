import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";

import Header from "../Components/Header";
import ModalWindow from "../Components/Modal";
import ListPosts from "../Components/ListPosts";
import HashtagsBox from "../Components/HashtagsBox";

export default function UserPage() {
  const { id } = useParams();
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [idPostForDelete, setIdPostForDelete] = useState();
  const [reloadPosts, setReloadPosts] = useState(true);
  const userPage = true;

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
  }, [id, reloadPosts]);

  return (
    <>
      <ModalWindow
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        idPostForDelete={idPostForDelete}
        reloadPosts={reloadPosts}
        setReloadPosts={setReloadPosts}
      />
      <Body isLoading={ isLoading } modalIsOpen={modalIsOpen} >
        <Header />
        {isLoading ? 
          <ThreeCircles color={"#FFFFFF"}/> 
        : 
          <Main isLoading={ isLoading } >
              <Container>
                <div className="left-side">
                  <div className="top">
                    <img src={ userPosts[0].userPhoto } alt="" />
                    <h1>{ userPosts[0].userName }'s posts</h1>
                  </div>
                  {userPosts[0].postId ?
                      <ListPosts
                        posts={ userPosts }
                        userPage={userPage}
                        modalIsOpen={modalIsOpen}
                        setModalIsOpen={setModalIsOpen}
                        setIdPostForDelete={setIdPostForDelete}
                      />
                    :
                      <div className="no-posts">
                        <h2>There are no posts yet.</h2>
                      </div>
                    }
                </div>
                <div className="right-side">
                  <HashtagsBox />
                </div>
              </Container>
          </Main>
        }
      </Body>
    </>
  );
}

const Body = styled.div`
  background: #333333;
  opacity: ${({modalIsOpen}) => modalIsOpen ? "25%" : "100%" };

  width: 100%;
  min-height: 100vh;

  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: ${({isLoading}) => isLoading ? "center" : "inherit"};
  align-items: ${({isLoading}) => isLoading ? "center" : "inherit"};
`;

const Main = styled.div`
  background-color: #333333;

  width: 100%;
  height: 100%;
  margin-top: 72px;

  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  margin-top: 60px;

  display: flex;
  justify-content: center;

  .left-side {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    width: 611px;

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
    margin-top: 12px;
  }

  @media screen and (max-width: 940px) {
    .right-side {
      display: none;
    }
  }

  @media screen and (max-width: 611px) {
    width: 100%;

    .left-side {
      width: 100%;
    }
  }

  @media screen and (max-width: 480px) {
    margin-top: 90px;
  }
`;