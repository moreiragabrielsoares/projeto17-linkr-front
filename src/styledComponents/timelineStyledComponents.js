import styled from "styled-components";

export const Posts = styled.div`
  font-family: "Lato";
  color: #ffffff;

  width: 100%;
  margin-top: 48px;

  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
    color: #ffffff;
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
      cursor: ${({ userPage }) => (userPage ? "initial" : "pointer")};

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
      color: #b7b7b7;
      font-size: 17px;
      font-weight: 400;

      margin: 7px 0;
      margin-bottom: 18px;
    }

    input {
      background-color: ${({ loadingEdit }) =>
        loadingEdit ? "#EDEDED" : "#FFFFFF"};
      border-radius: 7px;
      outline: none;

      color: #4c4c4c;
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
        color: #ffffff;
        cursor: ${({ userPage }) => (userPage ? "initial" : "pointer")};
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

export const Link = styled.div`
  border: 1px solid #4d4d4d;
  border-radius: 11px;
  cursor: pointer;

  width: 100%;
  display: flex;

  .texts {
    color: #cecece;
    font-weight: 400;

    width: 70%;
    margin: 25px 20px;

    h2 {
      font-size: 16px;
      margin-bottom: 5px;
    }

    h3 {
      color: #9b9595;
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