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
            <Link>
              <div className="texts">
                <h2>Link Title</h2>
                <h3>Link description</h3>
                <h4>{ post.postUrl }</h4>
              </div>
              <div className="image-link">
                <img src="https://s2.glbimg.com/0o18p02oHCgoYTS5GVADA-E0RKA=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2021/n/s/Ke157rT2mwnBn9maMRVQ/2012-04-13-ui-eles-vao-explicar-o-meme.jpg" alt="" />
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
      margin-bottom: 18px;
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
    object-fit: cover;

    img {
      border-radius: 0 11px 11px 0;
      
      width: 100%;
      height: 100%;
    }
  }
`;