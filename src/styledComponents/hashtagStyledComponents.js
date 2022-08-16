import styled from "styled-components";

export const BoxContainer = styled.div`
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

export const Title = styled.div`
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    color: #FFFFFF;
    margin: 15px;
`;

export const Line = styled.div`
    height: 0.5px;
    background: #484848;
`;

export const HashtagsContainer = styled.div`
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

export const HashtagLine = styled.div`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 19px;
    letter-spacing: 0.05em;
    color: #FFFFFF;
    cursor: pointer;
    margin: 5px 0;
`;