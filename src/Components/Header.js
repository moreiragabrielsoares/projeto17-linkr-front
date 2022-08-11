import styled from "styled-components";
import { BsChevronDown } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";

export default function Header({ userImage, isLoading }) {
  return (
    <Head>
      <h1>linkr</h1>
      <div className="center">
        <input
          type="text"
          placeholder="Search for people"
          disabled={isLoading}
        />
        <button><AiOutlineSearch color="#C6C6C6" size={"21px"} /></button>
      </div>
      <div className="right">
        <BsChevronDown color="#FFFFFF"size={"21px"} />
        <img src={userImage} alt="usuario" />
      </div>
    </Head>
  );
}

const Head = styled.header`
  background-color: #151515;

  width: 100%;
  height: 72px;
  padding: 0 30px;
  
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    color: #FFFFFF;
    font-family: "Passion One";
    font-size: 49px;
    font-weight: 700;
  }

  .center {
    background-color: #FFFFFF;
    border-radius: 8px;

    width: 50%;
    height: 45px;
    padding: 0 15px;

    display: flex;
    justify-content: space-between;

    input {
      font-size: 19px;
      outline: none;
      border-radius: 8px;

      ::placeholder {
        color: #C6C6C6;
        font-size: 19px;
      }
    }

    button {
      background-color: #FFFFFF;
      border: none;
      border-radius: 8px;
    }
  }
  
  .right {
    display: flex;
    align-items: center;

    img {
      border-radius: 50%;
      object-fit: cover;

      width: 50px;
      height: 50px;
      margin-left: 10px;
    }
  }
`;