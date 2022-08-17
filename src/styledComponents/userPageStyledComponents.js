import styled from "styled-components";

export const Body = styled.div`
  background: #333333;
  opacity: ${({modalIsOpen}) => modalIsOpen ? "25%" : "100%" };

  width: 100%;
  min-height: 100vh;

  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: ${({isLoading}) => isLoading ? "center" : "inherit"};
  align-items: ${({isLoading}) => isLoading ? "center" : "inherit"};
`;

export const Main = styled.div`
  background-color: #333333;

  width: 100%;
  height: 100%;
  margin-top: 72px;

  display: flex;
  justify-content: center;
`;

export const Container = styled.div`
  margin-top: 60px;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Top = styled.div`
  margin-left: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left {
    display: flex;
    
    img {
      border-radius: 50%;
      object-fit: cover;

      width: 50px;
      height: 50px;
    }

    h1 {
      color: #FFFFFF;
      font-family: "Oswald";
      font-size: 43px;
      font-weight: 700;
      margin-left: 18px;
    }
  }

  button {
    border: none;
    border-radius: 5px;
    cursor: pointer;

    font-family: "Lato";
    font-size: 14px;
    font-weight: 700;

    width: 112px;
    height: 31px;
  }
  
  button:disabled {
    background-color: #E3E3E3;
    color: #000000;
    cursor: initial;
  }

  .no-following {
    background-color: #1877F2;
    color: #FFFFFF;
  }

  .following {
    background-color: #FFFFFF;
    color: #1877F2;
  }

  @media screen and (max-width: 611px) {
    margin-right: 18px;
    
    button {
      width: 90px;
    }
  }

  @media screen and (max-width: 580px) {
    margin-top: 30px;
  }

  @media screen and (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;

    button {
      margin-top: 25px;
      align-self: center;
    }
  }
`;

export const Center = styled.div`
  display: flex;
  
  .left-side {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    width: 611px;
    margin-top: 38px;

    .no-posts {
      margin-left: 18px;

      h2 {
        color: #FFFFFF;
        font-family: "Lato";
        font-size: 20px;
        font-weight: 400;

        margin-top: 35px;
        margin-left: 18px;
      }
    }
  }

  @media screen and (max-width: 940px) {
    .left-side {
      margin-top: 0;
    }

    .right-side {
      display: none;
    }
  }

  @media screen and (max-width: 611px) {
    width: 100%;

    .left-side {
      width: 100%;
    }
  }
`;