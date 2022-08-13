import React from "react";
import { useState , useEffect , useContext} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { ThreeDots } from  "react-loader-spinner";


//import Header from "../Components/Header";
import ListPosts from "../Components/ListPosts";


export default function TimelinePage() {
    
    const navigate = useNavigate();

    const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY2MDI1NTAxNSwiZXhwIjoxNjYwMzQxNDE1fQ.ekRkVZupgPQyewxnd0v1vJKYyZcoLvRcCYx79R6wHCE"; //mudar para o token do local storage

    const config = {
        headers: {
            "Authorization": `Bearer ${userToken}`
        }
    }
    
    const [postsList, setPostsList] = useState([]);

    useEffect(() => {

		const promisse = axios.get("http://localhost:4000/timeline", config); //mudar para o link do back em produção

		promisse.then(success);

        function success (res) {
            setPostsList(res.data);
        }
        
        promisse.catch((erro) => {alert(erro.response.data)});

	}, []);

    console.log(postsList);

    const [postUrl, setPostUrl] = useState("");
    const [postText, setPostText] = useState("");
    const [isFormDisabled, setIsFormDisabled] = useState(false);

    function createPost(event) {
        event.preventDefault();
    
        setIsFormDisabled(true);

        const postObj = {
            postText,
            postUrl
        }

        const request = axios.post("http://localhost:4000/timeline", postObj, config); //mudar para o link do back em produção
        
        request.then(postSuccess);         
        
        request.catch((erro) => {alert(erro.response.data); setIsFormDisabled(false)});
    }

    function postSuccess(res) {
        setIsFormDisabled(false);
        setPostText("");
        setPostUrl("");
        setPostsList(res.data);
    }
    
    return (
        <BodyContainer>

            {/* <Header userImage={user.userPhoto} isLoading={isLoading} /> */}

            <ContentContainer>

                <TitleLine>
                    <h1>timeline</h1>
                </TitleLine>

                <CreatePostContainer>

                    <UserPhoto>
                        <img src="https://i0.wp.com/www.jbox.com.br/wp/wp-content/uploads/2021/10/narutofeliz-destacada.jpg?fit=774%2C489&quality=99&strip=all&ssl=1"/>
                         {/*trocar para foto do usuário que estará no local storage*/}
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
                                (<FormsButton type="submit" disabled={isFormDisabled}>
                                    <ThreeDots color="#FFFFFF" height={50} width={50} />
                                </FormsButton>) 
                                : (<FormsButton type="submit" disabled={isFormDisabled}>Publish</FormsButton>)
                            }
        
                        </Forms>

                    </FormsContainer>

                </CreatePostContainer>

                <PostsContainer>

                    <ListPosts posts={ postsList } />

                </PostsContainer>                

            </ContentContainer>

        </BodyContainer>
    );
}


const BodyContainer = styled.div`
    background: #333333;
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
    flex-direction: column;
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
`;

const PostsContainer = styled.div`
    width: 611px;
`;