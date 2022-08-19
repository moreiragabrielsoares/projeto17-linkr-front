import axios from "axios";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Modal } from "../styledComponents/modalStyledComponents";

export default function ModalWindow({
  modalIsOpen,
  setModalIsOpen,
  idPostForDelete,
  reloadPosts,
  setReloadPosts,
  setIdPostForDelete,
  setIdRepost,
  idRepost,
}) {
  const [loading, setLoading] = useState(false);

  function handleRepost(id) {
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("userData"));
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const response = axios.delete(
      `https://projeto17-back.herokuapp.com/repost/${idRepost}`,
      config
    );

    response.then(() => {
      setReloadPosts(!reloadPosts);
      setModalIsOpen(false);
      setLoading(false);
      setIdRepost("");
    });
    response.catch((r) => {
      alert(`Error ${r.response.status}! Try again later...`);
      setLoading(false);
    });
  }

  function handleDelete(id) {
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("userData"));
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const response = axios.delete(
      `https://projeto17-back.herokuapp.com/timeline/${idPostForDelete}`,
      config
    );

    response.then(() => {
      setReloadPosts(!reloadPosts);
      setModalIsOpen(false);
      setLoading(false);
      setIdPostForDelete("");
    });
    response.catch((r) => {
      alert(`Error ${r.response.status}! Try again later...`);
      setLoading(false);
    });
  }

  function cancelModal() {
    setModalIsOpen(false);
    {idPostForDelete !== "" ? setIdPostForDelete("") : setIdRepost("")}
  }

  return (
    <Modal modalIsOpen={modalIsOpen}>
      {idPostForDelete !== "" ? (
        <h1>Are you sure you want to delete this post?</h1>
      ) : (
        <h1>Do you want to re-post this link?</h1>
      )}
      {loading ? (
        <ThreeDots color="#1877F2" width={40} height={40} />
      ) : (
        <div className="buttons">
          <button
            onClick={cancelModal}
            disabled={loading}
          >
            No, {idPostForDelete !== "" ? "go back" : "cancel"}
          </button>
          <button
            onClick={idPostForDelete !== "" ? handleDelete : handleRepost}
          >
            Yes, {idPostForDelete !== "" ? "delete it" : "share!"}
          </button>
        </div>
      )}
    </Modal>
  );
}
