import styled from "styled-components";

export const Head = styled.header`
  background-color: #151515;

  width: 100%;
  height: 72px;
  padding: 0 30px;
  z-index: 1;
  top: 0;
  left: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;

  h1 {
    color: #ffffff;
    font-family: "Passion One";
    font-size: 49px;
    font-weight: 700;
    cursor: pointer;
  }

  .right {
    display: flex;
    align-items: center;
    position: relative;
    z-index: 3;
    .logout {
      width: 150px;
      height: 43px;
      position: absolute;
      bottom: -43px;
      background: #171717;
      border-radius: 0px 0px 20px 20px;
      font-family: "Lato";
      cursor: pointer;
      display: flex;
      align-items: center;
      padding-left: 30px;
      color: #ffffff;
      font-weight: 700;
      font-size: 15px;
      line-height: 18px;
      letter-spacing: 0.05em;
    }
    .logout.logoutActive {
      bottom: 0px;
      display: none;
    }

    img {
      border-radius: 50%;
      object-fit: cover;

      width: 50px;
      height: 50px;
      margin-left: 10px;
    }
  }

  @media screen and (max-width: 720px) {
    h1 {
      font-size: 45px;
    }
    .right {
      img {
        width: 40px;
        height: 40px;
      }
    }
  }
`;

export const Center = styled.div`
  background-color: #ffffff;
  border-radius: 8px;

  width: 50%;

  display: flex;
  flex-direction: column;
  position: relative;

  .bar {
    width: 100%;
    height: 45px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    input {
      font-size: 19px;
      outline: none;
      border-radius: 8px;

      width: 85%;
      padding: 0 15px;

      ::placeholder {
        color: #c6c6c6;
        font-size: 19px;
      }
    }

    button {
      background-color: #ffffff;
      border: none;
      border-radius: 8px;
      display: flex;
      justify-content: flex-end;

      width: 15%;
      padding-right: 3%;
    }
  }

  .list-user {
    background-color: #e7e7e7;
    border-radius: 0 0 8px 8px;

    width: 100%;
    padding: 14px 15px 10px 15px;

    position: absolute;
    top: 39px;

    h2,
    h3 {
      color: #515151;
      font-family: "Lato";
      font-size: 19px;
      font-weight: 400;
    }

    h3 {
      text-align: center;
      margin-bottom: 13px;
    }

    .user {
      display: flex;
      align-items: center;
      cursor: pointer;

      width: 100%;
      margin-bottom: 13px;

      img {
        border-radius: 50%;
        object-fit: cover;

        width: 39px;
        height: 39px;
        margin-right: 12px;
      }
    }
  }

  @media screen and (max-width: 480px) {
    display: none;
  }
`;

export const MobileSearchBar = styled.div`
display: none;
background-color: #333333;

width: 100%;
height: 45px;
padding-top: 8px;

position: absolute;
top: 72px;
left: 0;

.bar {
  width: 90%;
  height: 100%;
  //z-index: 1;

  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: center;

  input {
    font-size: 19px;
    outline: none;
    border-radius: 8px 0 0 8px;

    width: 85%;
    height: 100%;
    padding: 0 15px;

    ::placeholder {
      color: #c6c6c6;
      font-size: 19px;
    }
  }

  button {
    background-color: #ffffff;
    border: none;
    border-radius: 0 8px 8px 0;

    width: 15%;
    height: 100%;
  }
}

.list-user {
  background-color: #e7e7e7;
  border-radius: 0 0 8px 8px;

  width: 90%;
  padding: 14px 15px 10px 15px;

  position: absolute;
  top: 39px;

  h2,
  h3 {
    color: #515151;
    font-family: "Lato";
    font-size: 19px;
    font-weight: 400;
  }

  h3 {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 13px;
  }

  .user {
    display: flex;
    align-items: center;
    cursor: pointer;

    width: 100%;
    margin-bottom: 13px;

    img {
      border-radius: 50%;
      object-fit: cover;

      width: 39px;
      height: 39px;
      margin-right: 12px;
    }
  }
}

@media screen and (max-width: 480px) {
  display: flex;
  align-items: center;
  flex-direction: column;

  .list-user {
    h2,
    h3 {
      font-size: 17px;
    }
  }
}
`;