import React from "react";
import { useState , useEffect , useContext} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";



export default function HashtagsBox() {

    const navigate = useNavigate();

    const userData = JSON.parse(localStorage.getItem("userData"));

    const config = {
        headers: {
            "Authorization": `Bearer ${userData.token}`
        }
    }
    
    const [hashtagsList, setHashtagsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

		const promisse = axios.get("https://projeto17-back.herokuapp.com/hashtags", config);

		promisse.then(success);

        function success (res) {
            setHashtagsList(res.data);
            console.log(res.data);
            setIsLoading(false);
        }
        
        promisse.catch((error) => {alert("An error occured while trying to fetch the posts, please refresh the page")});

	}, []);

    function hashtagPage(hashtag) {
        console.log(hashtag);
        navigate(`/hashtag/${hashtag}`);
      }

    function checkHashtags () {
        if (isLoading) {
            return (<h2>Loading...</h2>);
        }

        if (hashtagsList.length === 0) {
            return (<h2>There are no hashtags yet.</h2>);
        }

        return hashtagsList.map((hashtag) => <HashtagLine onClick = {() => hashtagPage(hashtag.hashtag)}>{`# ${hashtag.hashtag}`}</HashtagLine>)
    }


    return (
        <BoxContainer>

            <Title>trending</Title>
            <Line></Line>
            <HashtagsContainer>
                {checkHashtags()}
            </HashtagsContainer>

        </BoxContainer>
    )

}

const BoxContainer = styled.div`
    background: #171717;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    width: 301px;
    margin-left: 20px;
    margin-top: 86px;

    @media screen and (max-width: 940px) {
        display: none;
    }
`;

const Title = styled.div`
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    color: #FFFFFF;
    margin: 15px;
`;

const Line = styled.div`
    height: 0.5px;
    background: #484848;
`;

const HashtagsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 15px;

    h2 {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        color: #707070;
        margin-bottom: 10px;
    }
`;

const HashtagLine = styled.div`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 19px;
    letter-spacing: 0.05em;
    color: #FFFFFF;
    cursor: pointer;
    margin: 5px 0;
`;