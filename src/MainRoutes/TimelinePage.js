import React from "react";
import { useState , useEffect , useContext} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";


import Header from "../Components/Header";
import ListPosts from "../Components/ListPosts";
import HashtagsBox from "../Components/HashtagsBox";
import ModalWindow from "../Components/Modal";


export default function TimelinePage() {
    
    const navigate = useNavigate();

    const userData = JSON.parse(localStorage.getItem("userData"));

    const config = {
        headers: {
            "Authorization": `Bearer ${userData.token}`
        }
    }
    
    const [postsList, setPostsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [idPostForDelete, setIdPostForDelete] = useState();
    const [reloadPosts, setReloadPosts] = useState(true);

    useEffect(() => {

		const promisse = axios.get("https://projeto17-back.herokuapp.com/timeline", config);

		promisse.then(success);
        function success (res) {
            setPostsList(res.data);
            setIsLoading(false);
        }
        
        promisse.catch((error) => {alert("An error occured while trying to fetch the posts, please refresh the page")});

	}, [reloadPosts]);

    const [postUrl, setPostUrl] = useState("");
    const [postText, setPostText] = useState("");
    const [isFormDisabled, setIsFormDisabled] = useState(false);

    function createPost(event) {
        event.preventDefault();
        setIsFormDisabled(true);
        setIsLoading(true);

        const postObj = {
            postText,
            postUrl
        }

        const request = axios.post("https://projeto17-back.herokuapp.com/timeline", postObj, config);
        
        request.then(postSuccess);

        request.catch((error) => {errorTreatment(error); alert(error.response.data); setIsFormDisabled(false); setIsLoading(false)});
    }

    function errorTreatment(error) {
        
        if (error.response.status === 500) {
            return alert("An error occured while trying to fetch the posts, please refresh the page");
        }

        return alert(error.response.data);
    }

    function postSuccess(res) {
        setIsFormDisabled(false);
        setPostText("");
        setPostUrl("");
        setPostsList(res.data);
        setIsLoading(false);
    }

    function checkPosts () {
        if (isLoading) {
            return (<h2>Loading...</h2>);
        }

        if (postsList.length === 0) {
            return (<h2>There are no posts yet.</h2>);
        }

        return (<ListPosts 
                    posts={ postsList } 
                    setModalIsOpen={setModalIsOpen}
                    setIdPostForDelete={setIdPostForDelete}
                />)
    }

    return (
        <>

            <ModalWindow
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                idPostForDelete={idPostForDelete}
                reloadPosts={reloadPosts}
                setReloadPosts={setReloadPosts}
            />

            <BodyContainer modalIsOpen={modalIsOpen}>

                <Header />

                <ContentContainer>

                    <LeftContainer>

                        <TitleLine>
                            <h1>timeline</h1>
                        </TitleLine>

                        <CreatePostContainer>

                            <UserPhoto>
                                <img src={userData.photo}/>
                            </UserPhoto>

                            <FormsContainer>

                                <h3>What are you going to share today?</h3>

                                <Forms onSubmit={createPost}>

                                    <FormsInputUrl 
                                        id="postUrl" 
                                        placeholder="http://..." 
                                        onChange={e => setPostUrl(e.target.value)} 
                                        value={postUrl}
                                        type="text"
                                        required
                                        disabled={isFormDisabled}
                                    />
                                    <FormsInputText 
                                        id="postText" 
                                        placeholder="Your comment..." 
                                        onChange={e => setPostText(e.target.value)} 
                                        value={postText}
                                        type="text"
                                        disabled={isFormDisabled}
                                    />

                                    {isFormDisabled ? 
                                        (<FormsButton type="submit" disabled={isFormDisabled}>Publishing...</FormsButton>) 
                                        : (<FormsButton type="submit" disabled={isFormDisabled}>Publish</FormsButton>)
                                    }
                
                                </Forms>

                            </FormsContainer>

                        </CreatePostContainer>

                        <PostsContainer>

                            {checkPosts()}

                        </PostsContainer>

                    </LeftContainer>

                    <RightContainer>
                        
                        <HashtagsBox reloadPosts={reloadPosts} postsList={postsList}></HashtagsBox>

                    </RightContainer>                

                </ContentContainer>

            </BodyContainer>

        </>
    );
}


const BodyContainer = styled.div`
    background: #333333;
    opacity: ${({modalIsOpen}) => modalIsOpen ? "25%" : "100%" };
    width: 100%;
    min-height: 100vh;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ContentContainer = styled.div`
    margin-top:150px;
    background: #333333;
    display: flex;
    flex-direction: row;
`;

const LeftContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const RightContainer = styled.div`
`;

const TitleLine = styled.div`
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

const CreatePostContainer = styled.div`
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

const UserPhoto = styled.div`
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

const FormsContainer = styled.div`
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

const Forms = styled.form`
    display: flex;
    flex-direction: column;
`;

const FormsInputUrl = styled.input`
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

const FormsInputText = styled.input`
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

const FormsButton = styled.button`
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

const PostsContainer = styled.div`
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