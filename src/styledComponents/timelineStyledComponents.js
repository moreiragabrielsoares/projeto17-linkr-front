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
  
  @media screen and (max-width: 611px) {
    .post {
      border-radius: 0;
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

export const BodyContainer = styled.div`
background: #333333;
opacity: ${({modalIsOpen}) => modalIsOpen ? "25%" : "100%" };
width: 100%;
min-height: 100vh;
position: absolute;
display: flex;
flex-direction: column;
align-items: center;
`;

export const ContentContainer = styled.div`
margin-top:150px;
background: #333333;
display: flex;
flex-direction: row;
`;

export const LeftContainer = styled.div`
display: flex;
flex-direction: column;
`;

export const RightContainer = styled.div`
`;

export const TitleLine = styled.div`
margin-bottom: 43px;
h1 {
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    color: #FFFFFF;
}

@media screen and (max-width: 500px) {
    h1 {
        padding-left: 15px;
    }
}
`;

export const CreatePostContainer = styled.div`
width: 611px;
height: 209px;
background: #FFFFFF;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 16px;
display: flex;
flex-direction: row;
padding: 15px;

@media screen and (max-width: 500px) {
    height: 164px;
    width: 100%;
    border-radius: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
}
`;

export const UserPhoto = styled.div`
width: 50px;
height: 50px;
border-radius: 50%;
margin-right: 18px;
img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
}

@media screen and (max-width: 500px) {
    display: none;
}
`;

export const FormsContainer = styled.div`
display: flex;
flex-direction: column;
margin-top:6px;
h3 {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    color: #707070;
    margin-bottom: 10px;
}

@media screen and (max-width: 500px) {
    
    align-items: center;
    
    h3 {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 300;
        font-size: 17px;
        color: #707070;
        margin-bottom: 15px;
    }
}
`;

export const Forms = styled.form`
display: flex;
flex-direction: column;
`;

export const FormsInputUrl = styled.input`
width: 503px;
height: 30px;
background: #EFEFEF;
border-radius: 5px;
margin-bottom: 5px;
padding-left:10px;
::placeholder{
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    color: #949494;
}

:disabled{
    opacity: 0.6;
}

@media screen and (max-width: 500px) {
    width: 345px;
}
`;

export const FormsInputText = styled.input`
width: 503px;
height: 66px;
background: #EFEFEF;
border-radius: 5px;
margin-bottom: 5px;
padding-left:10px;
::placeholder{
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    color: #949494;
}

:disabled{
    opacity: 0.6;
}

@media screen and (max-width: 500px) {
    width: 345px;
    height: 47px;
}
`;

export const FormsButton = styled.button`
width: 112px;
height: 31px;
background: #1877F2;
border-radius: 5px;
border: 1px solid #1877F2;
font-family: 'Lato';
font-style: normal;
font-weight: 700;
font-size: 14px;
color: #FFFFFF;
display: flex;
align-items: center;
justify-content: center;
margin-left: auto;

:disabled{
    opacity: 0.6;
}

:hover {
    cursor: pointer;
}

@media screen and (max-width: 500px) {
    width: 112px;
    height: 22px;
}
`;

export const PostsContainer = styled.div`
width: 611px;

h2 {
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    color: #FFFFFF;

    margin-top: 30px;
}

@media screen and (max-width: 500px) {
    width: 100%;
}
`;