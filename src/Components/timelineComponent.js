import { useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { ReactTagify } from "react-tagify";
import ReactTooltip from "react-tooltip";
import { arrayContains } from "../Scripts/scripts";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "../styledComponents/timelineStyledComponents";

export function Post({
  post,
  setModalIsOpen,
  setIdPostForDelete,
  addLike,
  removeLike,
  config,
  loadingEdit, 
  setLoadingEdit
}) {
  
  const tooltip = "";
  const user = JSON.parse(localStorage.getItem("userData"));
  const [isEditing, setIsEditing] = useState(false);
  const [postEdit, setPostEdit] = useState({
    postId: 0,
    postText: "",
    postUrl: "",
  });
  
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const tagStyle = {
    color: "crimson",
    fontWeight: 700,
    cursor: "pointer",
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  function hashtagPage(tag) {
    const hashtag = tag.slice(1, tag.length);
    navigate(`/hashtag/${hashtag}`);
  }
  
  useEffect(() => {
    const handleKeybord = (event) => {
      if (event.keyCode === 27 && isEditing) {
        setIsEditing(false);
      } else if (event.key === "Enter" && isEditing) {
        setLoadingEdit(true);
        const response = axios.put(
          `https://projeto17-back.herokuapp.com/timeline/${postEdit.postId}`,
          { postText: postEdit.postText, postUrl: postEdit.postUrl },
          config
        );

        response.then(() => {
          document.location.reload();
          setLoadingEdit(false);
          setIsEditing(false);
        });
        response.catch((r) => {
          alert(`Unable to save changes! Try again...`);
          setLoadingEdit(false);
        });
      }
    };
    window.addEventListener("keydown", handleKeybord);

    return () => {
      window.removeEventListener("keydown", handleKeybord);
    };
  }, [isEditing, postEdit]);

  function handleEditPost(id, text, url) {
    setIsEditing(!isEditing);
    setPostEdit({ postText: text, postId: id, postUrl: url });
  }

  return (
    <div className="post">
      <div className="left">
        <img
          src={post.userPhoto}
          alt=""
          onClick={() => navigate(`/user/${post.userId}`)}
        />
        {!arrayContains(user.userId, post.usersIdLiked) ? (
          <AiOutlineHeart
            size={"20px"}
            onClick={() => {
              addLike(post.postId);
            }}
          />
        ) : (
          <AiFillHeart
            color={"red"}
            size={"20px"}
            onClick={() => removeLike(post.postId)}
          />
        )}
        <h3 data-tip={tooltip}>{post.usersIdLiked.length} Likes </h3>
        <ReactTooltip place="bottom" type="light" />
      </div>
      <div className="right">
        <span className="top-link">
          <h2 onClick={() => navigate(`/user/${post.userId}`)}>
            {post.userName}
          </h2>
          {user.userId === post.userId ? (
            <span className="edit-delete">
              <BsFillPencilFill
                size={"20px"}
                style={{ marginRight: "8px", cursor: "pointer" }}
                onClick={() =>
                  handleEditPost(post.postId, post.postText, post.postUrl)
                }
              />
              <BsFillTrashFill
                size={"20px"}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setModalIsOpen(true);
                  setIdPostForDelete(post.postId);
                }}
              />
            </span>
          ) : (
            <></>
          )}
        </span>
        {post.postId === postEdit.postId && isEditing ? (
          <input
            type="text"
            value={postEdit.postText}
            placeholder="Your comment..."
            onChange={(e) =>
              setPostEdit({ ...postEdit, postText: e.target.value })
            }
            ref={inputRef}
            disabled={loadingEdit}
          />
        ) : (
          <ReactTagify
            tagStyle={tagStyle}
            tagClicked={(tag) => hashtagPage(tag)}
          >
            <h2>{post.postText}</h2>
          </ReactTagify>
        )}
        <Link onClick={() => window.open(post.postUrl, "_blank")}>
          <div className="texts">
            <h2>{post.urlTitle}</h2>
            <h3>{post.urlDescription}</h3>
            <h4>{post.postUrl}</h4>
          </div>
          <div className="image-link">
            <img src={post.urlImage} alt="" />
          </div>
        </Link>
      </div>
    </div>
  );
}
