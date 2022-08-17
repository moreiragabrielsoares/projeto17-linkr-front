import React from "react";
import { useState , useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BodyContainer, LeftContainer, ContentContainer, TitleLine, PostsContainer } from "../styledComponents/hashtagPageStyledComponents";
import Header from "../Components/Header";
import ListPosts from "../Components/ListPosts";
import { backUrl, config } from "../Scripts/constants";

export default function HashtagPage() {

    const { hashtag } = useParams();
    
    const [postsList, setPostsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

		const promisse = axios.get(`${backUrl}hashtag/${hashtag}`, config);

		promisse.then(success);

        function success (res) {
            setPostsList(res.data);
            setIsLoading(false);
        }
        
        promisse.catch((error) => {alert("An error occured while trying to fetch the posts, please refresh the page")});

	}, []);

    function checkPosts () {
        if (isLoading) {
            return (<h2>Loading...</h2>);
        }

        if (postsList.length === 0) {
            return (<h2>There are no posts yet.</h2>);
        }

        return (<ListPosts posts={ postsList } />)
    }
    
    return (
        <BodyContainer>

            <Header />

            <ContentContainer>

                <LeftContainer>

                    <TitleLine>
                        <h1>{`#${hashtag}`}</h1>
                    </TitleLine>

                    <PostsContainer>

                        {checkPosts()}

                    </PostsContainer>

                </LeftContainer>                

            </ContentContainer>

        </BodyContainer>
    );
}