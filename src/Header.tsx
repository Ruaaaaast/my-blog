import React from "react";
import styled from "styled-components";

type HeaderProps = {
  name: string;
};

const HeaderSpan = styled.span`
  font-size: larger;
`;

const HeaderDiv = styled.div`
  padding: 7px;
`;

const Header: React.FC<HeaderProps> = ({ name }) => {
  return (
    <HeaderDiv className="Header">
      <HeaderSpan>{name}</HeaderSpan>
    </HeaderDiv>
  );
};

export default Header;
