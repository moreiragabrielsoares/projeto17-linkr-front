import styled from "styled-components";
import { AiOutlineHeart } from "react-icons/ai";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function ListPosts({ posts, userPage }) {
  const user = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();

  return (
    <Posts userPage={userPage}>
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
                  <BsFillPencilFill size={ "15px" } style={{ "margin-right": '8px', "cursor": 'pointer' }} />
                  <BsFillTrashFill size={ "15px" } style={{ "cursor": 'pointer' }} />
                </span>
              : <></>}
            </span>
            <h2>{ post.postText }</h2>
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

    .top-link {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    h2:first-child {
      cursor: ${({ userPage }) => userPage ? "initial" : "pointer"};
      font-size: 19px;
      font-weight: 400;

      margin-bottom: 5px;
    }

    h2:nth-child(2) {
      color: #B7B7B7;
      font-size: 17px;
      font-weight: 400;

      margin: 7px 0;
      margin-bottom: 18px;
    }
  }

  @media screen and (max-width: 720px) {
    .post {
      border-radius: 0;
    }

    margin-top: 20px;
  }

  @media screen and (max-width: 480px) {
    .right {
      h2:first-child {
        font-size: 17px;
      }

      h2:nth-child(2) {
        font-size: 15px;
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