import styled from "styled-components";
import { AiOutlineHeart } from "react-icons/ai";

export default function UserPosts({ user }) {
  const { posts } = user;

  return (
    <Posts>
      {posts.map((post, index) =>
        <div className="post" key={ index }>
          <div className="left">
            <img src={ user.userPhoto } alt="" />
            <AiOutlineHeart size={ "20px" } />
            <h3>X Likes</h3> {/* Colocar número de likes */}
          </div>
          <div className="right">
            <h2>{ user.name }</h2>
            <h2>{ post.content }</h2>
            <a href={ post.postUrl }>{ post.postUrl }</a>
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
      margin-bottom: 15px;
    }

    h3 {
      font-size: 11px;
      font-weight: 400;

      margin-top: 3px;
    }
  }

  .right {
    width: 90%;
    display: flex;
    flex-direction: column;

    h2:first-child {
      font-size: 19px;
      font-weight: 400;
    }

    h2:nth-child(2) {
      color: #B7B7B7;
      font-size: 17px;
      font-weight: 400;

      margin: 7px 0;
    }
  }

  @media screen and (max-width: 720px) {
    .post {
      border-radius: 0;
    }
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