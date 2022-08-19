import { useNavigate } from "react-router-dom";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineComment,
  AiOutlineSend,
} from "react-icons/ai";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { BiRepost } from "react-icons/bi";
import { ReactTagify } from "react-tagify";
import ReactTooltip from "react-tooltip";
import { arrayContains } from "../Scripts/scripts";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "../styledComponents/timelineStyledComponents";
import { backUrl, config } from "../Scripts/constants";
import styled from "styled-components";

export function Post({
  post,
  setModalIsOpen,
  setIdPostForDelete,
  setIdRepost,
  addLike,
  removeLike,
  loadingEdit,
  setLoadingEdit,
  setPostsList,
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
    const hashtag = ((tag.slice(1, tag.length)).toLowerCase());
    navigate(`/hashtag/${hashtag}`);
  }

  useEffect(() => {
    const handleKeybord = (event) => {
      if (event.keyCode === 27 && isEditing) {
        setIsEditing(false);
      } else if (event.key === "Enter" && isEditing) {
        setLoadingEdit(true);
        const response = axios.put(
          `${backUrl}timeline/${postEdit.postId}`,
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

  const [commentText, setCommentText] = useState("");
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  function openComments() {
    setIsCommentsOpen((prevState) => !prevState);
  }

  function checkDetail(isAuthor, isFollowing) {
    if (isAuthor) {
      return "posts's author";
    }

    if (isFollowing) {
      return "following";
    }

    return "";
  }

  function createComment(event, postId, comment) {
    event.preventDefault();
    setIsFormDisabled(true);
    const commentObj = {
      postId,
      comment,
    };

    const request = axios.post(`${backUrl}comment`, commentObj, config);

    request.then(postSuccess);

    request.catch((error) => {
      alert(error.response.data);
      setIsFormDisabled(false);
      setCommentText("");
    });

    console.log(commentObj);
  }

  function postSuccess(res) {
    setIsFormDisabled(false);
    setCommentText("");
    setPostsList(res.data);
  }

  return (
    <MainContainer>
      <div className="post">
        <div className="left">
          <img
            src={post.userPhoto}
            alt=""
            onClick={() => navigate(`/user/${post.userId}`)}
          />
          {!arrayContains(user.userId, post.usersLiked) ? (
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
          <h3 data-tip={tooltip}>{post.usersLiked.length} Likes </h3>
          <ReactTooltip place="bottom" type="light" />
          <CommentIcon>
            <AiOutlineComment size={"20px"} onClick={() => openComments()} />
          </CommentIcon>
          <h3>{post.postComments.length} comments </h3>
          <BiRepost
            size={"20px"}
            onClick={() => {
              setModalIsOpen(true);
              setIdRepost(post.postId);
            }}
          />
          <h3>{post.postComments.length} re-posts </h3>
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
      <CommentsContainer isCommentsOpen={isCommentsOpen}>
        {post.postComments?.map((comment, index) => (
          <>
            <CommentContainer>
              <UserPhoto>
                <img src={comment.userPhoto} />
              </UserPhoto>

              <RightContainer>
                <UserNameLine>
                  <UserName> {comment.userName} </UserName>
                  <Detail>
                    {" "}
                    {checkDetail(comment.isAuthor, comment.isFollowing)}{" "}
                  </Detail>
                </UserNameLine>

                <Comment> {comment.comment} </Comment>
              </RightContainer>
            </CommentContainer>
            <Line></Line>
          </>
        ))}

        <InputContainer>
          <UserPhoto>
            <img src={user.photo} />
          </UserPhoto>

          <FormsContainer
            onSubmit={(event) => createComment(event, post.postId, commentText)}
          >
            <FormsInputDiv>
              <FormsInput
                id="comment"
                placeholder="write a comment..."
                onChange={(e) => setCommentText(e.target.value)}
                value={commentText}
                type="text"
                required
                disabled={isFormDisabled}
              />

              <FormsIcon>
                <FormsButton type="submit" disabled={isFormDisabled}>
                  <AiOutlineSend color={"#F3F3F3"} />
                </FormsButton>
              </FormsIcon>
            </FormsInputDiv>
          </FormsContainer>
        </InputContainer>
      </CommentsContainer>
    </MainContainer>
  );
}

const CommentIcon = styled.div`
  margin-top: 15px;

  :hover {
    cursor: pointer;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
`;

const CommentsContainer = styled.div`
  display: ${({ isCommentsOpen }) => (isCommentsOpen ? "flex" : "none")};
  flex-direction: column;
  background: #1e1e1e;
  border-radius: 16px;
  padding: 0 20px 0 20px;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 15px;
`;

const UserPhoto = styled.div`
  margin-right: 18px;

  img {
    border-radius: 50%;
    object-fit: cover;
    width: 39px;
    height: 39px;
  }
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserNameLine = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 3px;
`;

const UserName = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  color: #f3f3f3;
  margin-right: 7px;
`;

const Detail = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #565656;
`;

const Comment = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #acacac;
`;

const Line = styled.div`
  height: 0.5px;
  background: #353535;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 15px;
`;

const FormsContainer = styled.form``;

const FormsInputDiv = styled.div`
  position: relative;
`;

const FormsInput = styled.input`
  width: 510px;
  height: 39px;
  background: #252525;
  border-radius: 8px;
  padding-left: 10px;
  color: #acacac;
  ::placeholder {
    font-family: "Lato";
    font-style: italic;
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 0.05em;
    color: #acacac;
  }

  :disabled {
    opacity: 0.6;
  }

  @media screen and (max-width: 500px) {
    width: 275px;
  }
`;

const FormsIcon = styled.div`
  position: absolute;
  right: 6px;
  bottom: 8px;
`;

const FormsButton = styled.button`
  background: none;
  border: none;

  :disabled {
    opacity: 0.6;
  }

  :hover {
    cursor: pointer;
  }
`;
