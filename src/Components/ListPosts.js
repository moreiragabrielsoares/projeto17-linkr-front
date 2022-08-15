import axios from "axios";
import { Post } from "./timelineComponent";
import { Posts } from "../styledComponents/timelineStyledComponents";
import { useState } from "react";

export default function ListPosts({ posts, userPage, setModalIsOpen, setIdPostForDelete }) {
  const user = JSON.parse(localStorage.getItem("userData"));
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const [loadingEdit, setLoadingEdit] = useState(false);

  function addLike(postId) {
    let body = {
      userId: user.userId,
      postId: postId,
      username: user.name,
    };
    console.log(body);
    const promise = axios.post(
      "https://projeto17-back.herokuapp.com/like",
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
      userId: user.userId,
      postId: postId,
    };

    const promise = axios.post(
      "https://projeto17-back.herokuapp.com/unlike",
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
      {user.length !== 0 ? posts?.map((post, index) => (
        <Post
          key={index}
          setIdPostForDelete={setIdPostForDelete}
          post={post}
          addLike={addLike}
          removeLike={removeLike}
          config={config}
          loadingEdit={loadingEdit}
          setLoadingEdit={setLoadingEdit}
          setModalIsOpen={setModalIsOpen}
        />
      )):<></>}
    </Posts>
  );
}
