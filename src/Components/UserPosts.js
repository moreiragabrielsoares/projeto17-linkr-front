import styled from "styled-components";

export default function UserPosts({ user }) {
  const { posts } = user;

  return (
    <>{posts.map((post, index) =>
      <Post key={ index }>
        <img src={ user.userPhoto } alt="" />
        <h2>{ user.name }</h2>
        <h2>{ post.content }</h2>
        <a href={ post.postUrl }>{ post.postUrl }</a>
      </Post>
    )}</>
  );
}

const Post = styled.div`

`;