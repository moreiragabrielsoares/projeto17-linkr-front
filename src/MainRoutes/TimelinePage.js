import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { errorTreatment } from "../Scripts/scripts";
import {
  BodyContainer,
  ContentContainer,
  LeftContainer,
  RightContainer,
  TitleLine,
  CreatePostContainer,
  UserPhoto,
  FormsContainer,
  Forms,
  FormsInputUrl,
  FormsInputText,
  FormsButton,
  PostsContainer,
} from "../styledComponents/timelineStyledComponents";
import { config, userData } from "../Scripts/constants";
import Header from "../Components/Header";
import ListPosts from "../Components/ListPosts";
import HashtagsBox from "../Components/HashtagsBox";
import ModalWindow from "../Components/Modal";
import { backUrl } from "../Scripts/constants";

export default function TimelinePage() {
  const [postsList, setPostsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [idPostForDelete, setIdPostForDelete] = useState("");
  const [idRepost, setIdRepost] = useState("");
  const [reloadPosts, setReloadPosts] = useState(true);
  const [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    const promisse = axios.get(`${backUrl}timeline`, config);

    promisse.then(success);

    function success(res) {
      setPostsList(res.data);
      if (res.data.length === 0) {
        const response = axios.get(`${backUrl}following`, config);

        response.then((r) => {
          setFollowingList([...r.data]);
          setIsLoading(false);
        }).catch((r) => {
          alert(`Error ${ r.response.status }!`);
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    }

    promisse.catch((error) => {
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
    });
  }, [reloadPosts]);

  const [postUrl, setPostUrl] = useState("");
  const [postText, setPostText] = useState("");
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  function createPost(event) {
    event.preventDefault();
    setIsFormDisabled(true);
    setIsLoading(true);

    const postObj = {
      postText,
      postUrl,
    };

    const request = axios.post(`${backUrl}timeline`, postObj, config);

    request.then(postSuccess);

    request.catch((error) => {
      errorTreatment(error);
      alert(error.response.data);
      setIsFormDisabled(false);
      setIsLoading(false);
    });
  }

  function postSuccess(res) {
    setIsFormDisabled(false);
    setPostText("");
    setPostUrl("");
    setPostsList(res.data);
    setIsLoading(false);
  }

  function checkPosts() {
    if (isLoading) {
      return <h2>Loading...</h2>;
    } else if (postsList.length === 0 && followingList.length > 0) {
      return <h2>No posts found from your friends.</h2>;
    } else if (postsList.length === 0 && followingList.length === 0) {
      return <h2>You don't follow anyone yet. Search for new friends!</h2>
    }

    return (
      <ListPosts
        posts={postsList}
        setModalIsOpen={setModalIsOpen}
        setIdPostForDelete={setIdPostForDelete}
        setPostsList={setPostsList}
        setIdRepost={setIdRepost}
      />
    );
  }

  return (
    <>
      <ModalWindow
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        idPostForDelete={idPostForDelete}
        reloadPosts={reloadPosts}
        setReloadPosts={setReloadPosts}
        setIdPostForDelete={setIdPostForDelete}
        setIdRepost={setIdRepost}
        idRepost={idRepost}
      />

      <BodyContainer modalIsOpen={modalIsOpen}>
        <Header />

        <ContentContainer>
          <LeftContainer>
            <TitleLine>
              <h1>timeline</h1>
            </TitleLine>

            <CreatePostContainer>
              <UserPhoto>
                <img src={userData.photo} alt="userPhoto" />
              </UserPhoto>

              <FormsContainer>
                <h3>What are you going to share today?</h3>

                <Forms onSubmit={createPost}>
                  <FormsInputUrl
                    id="postUrl"
                    placeholder="http://..."
                    onChange={(e) => setPostUrl(e.target.value)}
                    value={postUrl}
                    type="text"
                    required
                    disabled={isFormDisabled}
                  />
                  <FormsInputText
                    id="postText"
                    placeholder="Your comment..."
                    onChange={(e) => setPostText(e.target.value)}
                    value={postText}
                    type="text"
                    disabled={isFormDisabled}
                  />

                  {isFormDisabled ? (
                    <FormsButton type="submit" disabled={isFormDisabled}>
                      Publishing...
                    </FormsButton>
                  ) : (
                    <FormsButton type="submit" disabled={isFormDisabled}>
                      Publish
                    </FormsButton>
                  )}
                </Forms>
              </FormsContainer>
            </CreatePostContainer>

            <PostsContainer>{checkPosts()}</PostsContainer>
          </LeftContainer>

          <RightContainer>
            <HashtagsBox
              reloadPosts={reloadPosts}
              postsList={postsList}
            ></HashtagsBox>
          </RightContainer>
        </ContentContainer>
      </BodyContainer>
    </>
  );
}
