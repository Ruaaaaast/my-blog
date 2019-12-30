import React from "react";
import Header from "./Header";
import ArticlePage from "./ArticlePage";
import styled from "styled-components";

/**
 *  CSS Type
 */

type ContainerProps = {
  height: string;
  width: string;
  background: string;
};

/**
 *  CSS Template
 */

const Container = styled.div<ContainerProps>`
  height: ${props => props.height};
  width: ${props => props.width};
  background: ${props => props.background};
`;

/**
 *  CSS Value
 */

const HeadContainer: ContainerProps = {
  height: "5vh",
  width: "100%",
  background: "white"
};

const ContentContainer: ContainerProps = {
  height: "95vh",
  width: "100%",
  background: "white"
};

const App: React.FC = () => {
  //
  const articleList = [
    "年 2011-11-20.html",
    "路 2012-04-30.html",
    "当我要告别一中时我又在说些什么 2013-03-10.html",
    "撸 2013-08-26.html",
    "思修的论文之钊某人的自传 2013-12-19.html",
    "谜 2014-08-10.html",
    "怂 2015-09-08.html",
    "圈 2016-11-21.html",
    "莽 2017-12-31.html",
    "Black Lullaby 2018-12-31.html",
    "逃离母宇宙 2019-12-28.html"
  ];

  return (
    <div className="App">
      <Container className="App-header" {...HeadContainer}>
        <Header name="Who Knews" />
      </Container>
      <Container className="App-Content" {...ContentContainer}>
        <ArticlePage articleList={articleList.reverse()} />
      </Container>
    </div>
  );
};

export default App;
