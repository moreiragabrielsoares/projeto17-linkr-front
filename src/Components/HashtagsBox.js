import React from "react";
import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BoxContainer, Title, Line, HashtagsContainer, HashtagLine } from "../styledComponents/hashtagStyledComponents";
import { config, backUrl } from "../Scripts/constants";



export default function HashtagsBox({ reloadPosts, postsList }) {

    const navigate = useNavigate();
    
    const [hashtagsList, setHashtagsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

		const promisse = axios.get(`${backUrl}hashtags`, config);

		promisse.then(success);

        function success (res) {
            setHashtagsList(res.data);
            setIsLoading(false);
        }
        
        promisse.catch((error) => {alert("An error occured while trying to fetch the posts, please refresh the page")});

	}, [reloadPosts, postsList]);

    function hashtagPage(hashtag) {
        navigate(`/hashtag/${hashtag}`);
      }

    function checkHashtags () {
        if (isLoading) {
            return (<h2>Loading...</h2>);
        }

        if (hashtagsList.length === 0) {
            return (<h2>There are no hashtags yet.</h2>);
        }

        return hashtagsList.map((hashtag, index) => <HashtagLine key={index} onClick = {() => hashtagPage(hashtag.hashtag)}>{`# ${hashtag.hashtag}`}</HashtagLine>)
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