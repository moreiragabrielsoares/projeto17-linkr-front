import axios from "axios";
import { Post } from "./timelineComponent";
import { Posts } from "../styledComponents/timelineStyledComponents";
import { useEffect, useRef, useState } from "react";

export default function ListPosts({ posts, userPage, setIdPostForDelete }) {
  const user = JSON.parse(localStorage.getItem("userData"));
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const [isEditing, setIsEditing] = useState(false);
  const [postEdit, setPostEdit] = useState({
    postId: 0,
    postText: "",
    postUrl: "",
  });
  
  const [loadingEdit, setLoadingEdit] = useState(false);
  function handleEditPost(id, text, url) {
    setIsEditing(!isEditing);
    setPostEdit({ postText: text, postId: id, postUrl: url });
  }

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
      {user.length!==0?posts?.map((post, index) => (
        <Post
          setIdPostForDelete={setIdPostForDelete}
          post={post}
          handleEditPost={handleEditPost}
          addLike={addLike}
          index={index}
          removeLike={removeLike}
          setLoadingEdit={setLoadingEdit}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          postEdit={postEdit}
          config={config}
          setPostEdit={setPostEdit}
          loadingEdit={loadingEdit}
        />
      )):""}
    </Posts>
  );
}
