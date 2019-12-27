import React from "react";
import Header from "./Header";
import ArticlePage from "./ArticlePage";
import TitleList from "./TitleList";
import styled from "styled-components";

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.div`
  display: flex;
  background: papayawhip;
`;

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
  background: "papayawhip"
};

const ContentContainer: ContainerProps = {
  height: "95vh",
  width: "70%",
  background: "red"
};

const SidebarContainer: ContainerProps = {
  height: "95vh",
  width: "30%",
  background: "green"
};

const App: React.FC = () => {
  return (
    <div className="App">
      <Container className="App-header" {...HeadContainer}>
        <Header name="逃离母宇宙" />
      </Container>
      <Wrapper>
        <Container className="App-Content" {...ContentContainer}>
          <ArticlePage />
        </Container>
        <Container className="App-header" {...SidebarContainer}>
          <TitleList />
        </Container>
      </Wrapper>
    </div>
  );
};

export default App;
