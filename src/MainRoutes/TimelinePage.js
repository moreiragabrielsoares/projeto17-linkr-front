import React from "react";
import { useState , useEffect , useContext} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';




export default function TimelinePage() {
    
    const navigate = useNavigate();

    const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2MDIyODAyOCwiZXhwIjoxNjYwMzE0NDI4fQ.Na2-6tyafNv5kPAEG2UL88OS7Lo_oY0wOBMgrBI3jG8"; //mudar para o token do local storage

    const config = {
        headers: {
            "Authorization": `Bearer ${userToken}`
        }
    }
    
    const [postsList, setPostsList] = useState([]);

    // useEffect(() => {

	// 	const promisse = axios.get("http://localhost:4000/timeline", config); //mudar para o link do back em produção

	// 	promisse.then(success);

    //     function success (res) {
    //         setPostsList(res.data);
    //     }
        
    //     promisse.catch((erro) => {alert(erro.response.data)});

	// }, []);

    console.log(postsList);
    
    return (
        <BodyContainer>

            <ContentContainer>

                <LineTitle>
                    <h1>timeline</h1>
                </LineTitle>

                <CreatePostContainer>

                    <UserPhoto>
                        <img src="https://i0.wp.com/www.jbox.com.br/wp/wp-content/uploads/2021/10/narutofeliz-destacada.jpg?fit=774%2C489&quality=99&strip=all&ssl=1"/>
                    </UserPhoto>

                </CreatePostContainer>

            </ContentContainer>

        </BodyContainer>
    );
}


const BodyContainer = styled.div`
    background: #333333;
    height: 100vh;
    width: 100%;
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

const LineTitle = styled.div`
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
    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
    }
`;