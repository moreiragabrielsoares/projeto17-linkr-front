import styled from "styled-components";

export const Container = styled.div`
  width: 37%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #333333;
  justify-content:center;
  header {
    display: none;
  }
  a {
    color: #ffffff;
    font-family: "Lato";
    line-height: 20px;
    text-decoration-line: underline;
    margin-top: 21px;
  }
  @media only screen and (max-width: 815px) {
    width: 100%;
    height: 130vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:start;
    header {
      display: flex;
      width: 100%;
      min-height: 175px;
      background-color: #151515;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      color: #ffffff;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      h1 {
        font-family: "Passion One";
        font-weight: 700;
        font-size: 76px;
        line-height: 84px;
        letter-spacing: 0.05em;
        width: 167px;
        height: 70px;
      }
      h2 {
        width: 237px;
        height: 68px;
        font-family: "Oswald";
        font-size: 23px;
        line-height: 34px;
        text-align: center;
      }
    }
  }
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  h4 {
    margin-bottom: 20px;
    margin-top: -20px;
    color: #ffffff;
  }
  svg {
    padding-top: 3px;
  }

  input {
    width: 88%;
    height: 55px;
    background: #ffffff;
    box-shadow: 0px 0px 1px rgba(12, 26, 75, 0.24),
      0px 3px 8px -1px rgba(50, 50, 71, 0.05);
    border-radius: 6px;
    font-size: 22px;
    line-height: 33px;
    color: #000000;
    padding-left: 17px;
    margin-bottom: 24px;
    border: none;
    font-family: "Oswald";
    font-weight: 700;
    ::placeholder {
      font-size: 20px;
      line-height: 33px;
      color: #9f9f9f;
      font-family: "Oswald";
    }
  }
  button {
    font-family: "Oswald";
    border: none;
    width: 88%;
    height: 55px;
    background: #1877f2;
    border-radius: 6px;
    font-weight: 700;
    color: #ffffff;
    font-size: 22px;
    line-height: 33px;
  }
`;

export const Main = styled.main`
width:100%;
height:100%;
display:flex;
`

export const BannerComponent = styled.div`
display: none;

@media only screen and (min-width: 815px) {
  display: flex;
  width: 63%;
  height: 100vh;
  background: #151515;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
  flex-direction:column;
  justify-content:center;
  h1 {
    width: 233px;
    height: 117px;
    font-family: "Passion One";
    font-weight: 700;
    font-size: 106px;
    line-height: 117px;
    letter-spacing: 0.05em;
    color: #ffffff;
    margin-left:12%;
  }
  h2 {
    width: 442px;
    height: 128px;
    font-family: "Oswald";
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #ffffff;
    margin-left:12%;
  }
}
`;