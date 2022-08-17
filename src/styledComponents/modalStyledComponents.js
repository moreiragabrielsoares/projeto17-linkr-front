import styled from "styled-components";

export const Modal = styled.div`
  background-color: #333333;
  opacity: 100%;
  transform: translate(-50%, -50%);
  border-radius: 50px;
  
  z-index: 2;
  width: 600px;
  margin-right: -50%;
  padding: 50px 100px;

  display: ${({ modalIsOpen }) => modalIsOpen ? "flex" : "none"};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;

  h1 {
    color:#FFFFFF;
    font-family: "Lato";
    font-size: 34px;
    font-weight: 700;
    text-align: center;

    margin-bottom: 30px;
  }

  .buttons {
    width: 320px;
    display: flex;
    justify-content: space-around;
    
    button {
      font-family: "Lato";
      font-size: 18px;
      font-weight: 700;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      padding: 8px 20px;
    }

    button:first-child {
      background-color: #FFFFFF;
      color: #1877F2;
    }

    button:last-child {
      background-color: #1877F2;
      color: #FFFFFF;
    }
  }

  @media screen and (max-width: 720px) {
    width: 480px;
  }

  @media screen and (max-width: 480px) {
    width: 320px;
    padding: 50px 40px;

    h1 {
      font-size: 28px;
    }

    .buttons {
      width: 250px;

      button {
        font-size: 16px;
        padding: 9px 15px;
      }
    }
  }
`;