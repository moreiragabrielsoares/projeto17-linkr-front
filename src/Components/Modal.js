import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function ModalWindow({ modalIsOpen, setModalIsOpen, idPostForDelete, reloadPosts, setReloadPosts }) {
  const [loading, setLoading] = useState(false);

  function handleDelete(id) {
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("userData"));
    const config = {
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    };

    const response = axios.delete(`https://projeto17-back.herokuapp.com/timeline/${idPostForDelete}`, config);
    
    response.then(() => {
      setReloadPosts(!reloadPosts);
      setModalIsOpen(false);
      setLoading(false);
    });
    response.catch((r) => {
      alert(`Error ${ r.response.status }! Try again later... ${idPostForDelete}`);
      setLoading(false);
    });
  }

  return (
    <Modal modalIsOpen={modalIsOpen}>
      <h1>Are you sure you want to delete this post?</h1>
      {loading ? <ThreeDots color="#1877F2" width={40} height={40} /> :
      <div className="buttons">
        <button 
          onClick={() => setModalIsOpen(false)}
          disabled={loading}
          >No, go back
        </button>
        <button
          onClick={handleDelete}
          disabled={loading}
          >Yes, delete it
        </button>
      </div>}
    </Modal>
  )
}

const Modal = styled.div`
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