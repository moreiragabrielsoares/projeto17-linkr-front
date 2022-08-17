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
  justify-content: center;

  .left-side {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    width: 611px;

    .top {
      margin-left: 18px;
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

  .right-side {
    width: 30%;
    margin-top: 12px;
  }

  @media screen and (max-width: 940px) {
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

  @media screen and (max-width: 480px) {
    margin-top: 90px;
  }
`;