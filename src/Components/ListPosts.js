import styled from "styled-components";
import { AiOutlineHeart } from "react-icons/ai";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { ReactTagify } from "react-tagify";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function ListPosts({ posts, userPage, modalIsOpen, setModalIsOpen, setIdPostForDelete }) {
  const [postEdit, setPostEdit] = useState({postId: 0, postText: '', postUrl: ''});
  const [isEditing, setIsEditing] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const user = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const config = {
    headers: {
      "Authorization": `Bearer ${user.token}`
    }
  };

  useEffect(() => {
    if(isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing])

  useEffect(() => {
    const handleKeybord = (event) => {
       if (event.keyCode === 27 && isEditing) {
        setIsEditing(false);
      } else if (event.key === "Enter" && isEditing) {
        setLoadingEdit(true);
        const response = axios.put(`https://projeto17-back.herokuapp.com/timeline/${ postEdit.postId }`, { postText: postEdit.postText, postUrl: postEdit.postUrl }, config);
        
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
    window.addEventListener('keydown', handleKeybord);

    return () => {
      window.removeEventListener('keydown', handleKeybord);
    };
  }, [isEditing, postEdit]);

  const tagStyle = {
    color: 'crimson',
    fontWeight: 700,
    cursor: 'pointer'
  };

  function hashtagPage(tag) {
    const hashtag = tag.slice(1, tag.length);
    navigate(`/hashtag/${hashtag}`);
  }

  function handleEditPost(id, text, url) {
    setIsEditing(!isEditing);
    setPostEdit({postText: text, postId: id, postUrl: url});
  }

  return (
    <Posts userPage={userPage} loadingEdit={loadingEdit}>
      {posts.map((post, index) =>
        <div className="post" key={ index }>
          <div className="left">
            <img src={ post.userPhoto } alt="" onClick={() => navigate(`/user/${post.userId}`)} />
            <AiOutlineHeart size={ "20px" } />
            <h3>X Likes</h3> {/* Colocar número de likes */}
          </div>
          <div className="right">
            <span className="top-link">
              <h2 onClick={() => navigate(`/user/${post.userId}`)}>{ post.userName }</h2>
              {user.userId === post.userId ?
                <span className="edit-delete">
                  <BsFillPencilFill size={ "20px" } style={{ "marginRight": '8px', "cursor": 'pointer' }} onClick={() => handleEditPost(post.postId, post.postText, post.postUrl)}/>
                  <BsFillTrashFill size={ "20px" } style={{ "cursor": 'pointer' }} onClick={() => { setModalIsOpen(true); setIdPostForDelete(post.postId) }} />
                </span>
              : <></>}
            </span>
            {(post.postId === postEdit.postId) && isEditing ? 
              <input
                type="text"
                value={ postEdit.postText }
                placeholder="Your comment..." 
                onChange={(e) => setPostEdit({...postEdit, postText: e.target.value})}
                ref={inputRef}
                disabled={loadingEdit}
              />
            :
              <ReactTagify
              tagStyle={tagStyle}
              tagClicked={(tag) => hashtagPage(tag)}
              >
                <h2>{ post.postText }</h2>
              </ReactTagify>
            }
            <Link onClick={()=> window.open(post.postUrl, "_blank")}>
              <div className="texts">
                <h2>{ post.urlTitle }</h2>
                <h3>{ post.urlDescription }</h3>
                <h4>{ post.postUrl }</h4>
              </div>
              <div className="image-link">
                <img src={post.urlImage} alt="" />
              </div>
            </Link>
          </div>
        </div>
      )}
    </Posts>
  );
}

const Posts = styled.div`
  font-family: "Lato";
  color: #FFFFFF;

  width: 100%;
  margin-top: 48px;

  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
    color: #FFFFFF;
  }

  .post {
    background-color: #171717;
    border-radius: 16px;

    width: 100%;
    padding: 18px;
    margin-bottom: 18px;

    display: flex;
  }

  .left {
    width: 10%;
    margin-right: 15px;

    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      border-radius: 50%;
      object-fit: cover;
      cursor: ${({ userPage }) => userPage ? "initial" : "pointer"};

      width: 50px;
      height: 50px;
      margin-bottom: 15px;
    }

    h3 {
      font-size: 11px;
      font-weight: 400;
      text-align: center;

      margin-top: 3px;
    }
  }

  .right {
    width: 90%;
    display: flex;
    flex-direction: column;

    h2 {
      color: #B7B7B7;
      font-size: 17px;
      font-weight: 400;

      margin: 7px 0;
      margin-bottom: 18px;
    }

    input {
      background-color: ${({ loadingEdit }) => loadingEdit ? "#EDEDED" : "#FFFFFF"};
      border-radius: 7px;
      outline: none;

      color: #4C4C4C;
      font-family: "Lato";
      font-size: 17px;
      font-weight: 400;

      width: 100%;
      padding: 6px 10px;
      margin: 7px 0;
      margin-bottom: 18px;
    }

    .top-link {
      width: 100%;
      display: flex;
      justify-content: space-between;

      h2 {
        color: #FFFFFF;
        cursor: ${({ userPage }) => userPage ? "initial" : "pointer"};
        font-size: 19px;
        font-weight: 400;

        margin-bottom: 5px;
      }
    }
  }

  @media screen and (max-width: 480px) {
    .right {
      h2 {
        font-size: 15px;
      }

      .top-link {
        h2 {
          font-size: 17px;
        }
      }
    }
  }
`;

const Link = styled.div`
  border: 1px solid #4D4D4D;
  border-radius: 11px;
  cursor: pointer;

  width: 100%;
  display: flex;

  .texts {
    color: #CECECE;
    font-weight: 400;

    width: 70%;
    margin: 25px 20px;

    h2 {
      font-size: 16px;
      margin-bottom: 5px;
    }

    h3 {
      color: #9B9595;
      font-size: 11px;
    }

    h4 {
      font-size: 11px;
      margin-top: 13px;
    }
  }

  .image-link {
    width: 30%;

    img {
      border-radius: 0 11px 11px 0;
      object-fit: cover;
      
      width: 100%;
      height: 100%;
    }
  }
`;