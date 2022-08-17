import styled from "styled-components";

export const BodyContainer = styled.div`
    background: #333333;
    width: 100%;
    min-height: 100vh;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ContentContainer = styled.div`
    margin-top:150px;
    background: #333333;
    display: flex;
    flex-direction: row;
`;

export const LeftContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const TitleLine = styled.div`
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

export const PostsContainer = styled.div`
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