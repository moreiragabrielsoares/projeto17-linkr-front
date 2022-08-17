import React from "react";
import { useRef, useState, useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form } from "../../styledComponents/authStyledComponents";
import { backUrl } from "../../Scripts/constants";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHOTO_REGEX= /(https?:\/\/.*\.(?:png|jpg|jpeg|svg|jfif))/;

export default function RegisterForms() {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [photo, setPhoto] = useState("");
  const [validPhoto, setValidPhoto] = useState(false);
  const [photoFocus, setPhotoFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd]);

  useEffect(() => {
    setValidPhoto(PHOTO_REGEX.test(photo));
  }, [photo]);

  useEffect(() => {
    setErrMsg("");
  }, [user, email, pwd, photo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);
    const v4 = PHOTO_REGEX.test(photo);
    if (!v1) {
      setErrMsg(
        "Nome inválido, nome deve começar com uma letra e ter entre 3 - 23 caracteres "
      );
      return;
    }
    if (!v2) {
      setErrMsg(
        "Senha inválida, senha deve conter letra minúscula, letra maiúscula,caracter especial, número e ter entre 8 - 24"
      );
      return;
    }
    if (!v3) {
      setErrMsg("E-mail inválido, insira um e-mail válido");
    }
    if (!v4){
      setErrMsg("Imagem inválida")
    }
    try {
      const postObj = { name:user, email, password: pwd, userPhoto: photo};
      const response = await axios.post(
        `${backUrl}signup`,
        postObj
      );
      setUser("");
      setPwd("");
      setPhoto("");
      setEmail("");
      navigate("/");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Sem resposta do servidor");
      } else if (err.response?.status === 409) {
        setErrMsg("Usuário cadastrado / Email Cadastrado");
      } else {
        setErrMsg("Falha no registro");
      }
      errRef.current.focus();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </h2>
      <input
        type="email"
        id="email"
        autoComplete="off"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
        aria-invalid={validEmail ? "false" : "true"}
        aria-describedby="emailnote"
        onFocus={() => setEmailFocus(true)}
        onBlur={() => setEmailFocus(false)}
        placeholder="e-mail"
      />
      <h4
        id="emailnote"
        className={
          emailFocus && email && !validEmail ? "instructions" : "offscreen"
        }
      >
        <FaInfoCircle />
        Deve ser um e-mail válido.
        Deve ter 1 dominio.
        Ex: example@example.com
      </h4>
      <input
        type="password"
        id="password"
        onChange={(e) => setPwd(e.target.value)}
        value={pwd}
        required
        aria-invalid={validPwd ? "false" : "true"}
        aria-describedby="pwdnote"
        onFocus={() => setPwdFocus(true)}
        onBlur={() => setPwdFocus(false)}
        placeholder="Senha"
      />
      <h4
        id="pwdnote"
        className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
      >
        <FaInfoCircle />
        8 a 24 caracteres.
        <br />
        Deve incluir letras maiúscula e minúscula, um número e um caracter
        especial.
        <br />
      </h4>
      <input
        type="text"
        id="username"
        ref={userRef}
        autoComplete="off"
        onChange={(e) => setUser(e.target.value)}
        value={user}
        required
        aria-invalid={validName ? "false" : "true"}
        aria-describedby="uidnote"
        onFocus={() => setUserFocus(true)}
        onBlur={() => setUserFocus(false)}
        placeholder="username"
      />
      <h4
        id="uidnote"
        className={
          userFocus && user && !validName ? "instructions" : "offscreen"
        }
      >
        <FaInfoCircle />
        4 a 24 caracteres.
        <br />
        Deve começar com uma letra.
        <br />
        Letras, números, underline, hífen permitidos.
      </h4>
      
      <input
        type="text"
        id="photo"
        onChange={(e) => setPhoto(e.target.value)}
        value={photo}
        required
        aria-invalid={validPhoto ? "false" : "true"}
        aria-describedby="photonote"
        onFocus={() => setPhotoFocus(true)}
        onBlur={() => setPhotoFocus(false)}
        placeholder="picture url"
      />
      <h4
        id="confirmnote"
        className={photoFocus && !validPhoto ? "instructions" : "offscreen"}
      >
        <FaInfoCircle />
        Imagem inválida.
      </h4>
      <button
        type="submit"
        disabled={!validName || !validPwd || !validPhoto || !validEmail ? true : false}
      >
        {"Sign Up"}
      </button>
    </Form>
  );
}