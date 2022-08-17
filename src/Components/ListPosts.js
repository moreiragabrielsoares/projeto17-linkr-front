import axios from "axios";
import { Post } from "./timelineComponent";
import { Posts } from "../styledComponents/timelineStyledComponents";
import { useState } from "react";
import { config, userData, backUrl } from "../Scripts/constants";

export default function ListPosts({ posts, userPage, setModalIsOpen, setIdPostForDelete }) {
  const [loadingEdit, setLoadingEdit] = useState(false);

  function addLike(postId) {
    let body = {
      userId: userData.userId,
      postId: postId,
      username: userData.name,
    };
    console.log(body);
    const promise = axios.post(
      `${backUrl}like`,
      body,
      config
    );
    promise
      .then((res) => {
        console.log(res.data);
        document.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      });
  }

  function removeLike(postId) {
    let body = {
      userId: userData.userId,
      postId: postId,
    };

    const promise = axios.post(
      `${backUrl}unlike`,
      body,
      config
    );
    promise
      .then((res) => {
        document.location.reload();
      })
      .catch((err) => {
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      });
  }

  return (
    <Posts userPage={userPage} loadingEdit={loadingEdit}>
      {userData.length !== 0 ? posts?.map((post, index) => (
        <Post
          key={index}
          setIdPostForDelete={setIdPostForDelete}
          post={post}
          addLike={addLike}
          removeLike={removeLike}
          loadingEdit={loadingEdit}
          setLoadingEdit={setLoadingEdit}
          setModalIsOpen={setModalIsOpen}
        />
      )):<></>}
    </Posts>
  );
}
