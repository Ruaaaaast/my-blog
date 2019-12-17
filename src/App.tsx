import React from "react";
import "./App.css";
import Header from "./Header";
import ArticlePage from "./ArticlePage";
import TitleList from "./TitleList";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <div className="App-content">
        <ArticlePage />
      </div>
      <div className="App-sidebar">
        <TitleList />
      </div>
    </div>
  );
};

export default App;
