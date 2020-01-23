import React from "react";
import styled from "styled-components";
import { withMouse } from "./Playground";

type ArticlePageProps = {
  articleList: Array<string>;
};

// Create a Wrapper component that'll render a <section> tag with some styles
const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: auto;
  padding: 10px;
`;

const ArticleDivBox = styled.div<{ islast: boolean }>`
  height: 60px;
  padding: 10px;
  border-top-style: solid;
  border-color: darkgrey;
  border-left-style: solid;
  border-right-style: solid;
  border-bottom-style: ${props => (props.islast ? "solid" : "none")};
`;

const TitleA = styled.a`
  text-decoration: none;
  color: black;
`;

const TitleP = styled.p`
  color: #0d87e0;
  margin-top: 2px;
`;

class ArticlePage extends React.Component<ArticlePageProps> {
  render() {
    const { articleList } = this.props;
    return (
      <WrapperDiv className="ArticlePage">
        {articleList.map((value, index) => {
          const date = value.split(".")[0].slice(-10);
          const title = value.split(".")[0].slice(0, -10);
          return (
            <ArticleDivBox
              key={index}
              islast={index === articleList.length - 1}
            >
              <TitleP>{date}</TitleP>
              <TitleA href={value}>{title}</TitleA>
            </ArticleDivBox>
          );
        })}
      </WrapperDiv>
    );
  }
}

export default ArticlePage;
