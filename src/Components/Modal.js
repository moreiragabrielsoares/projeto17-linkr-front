import axios from "axios";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Modal } from "../styledComponents/modalStyledComponents";

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
      alert(`Error ${ r.response.status }! Try again later...`);
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