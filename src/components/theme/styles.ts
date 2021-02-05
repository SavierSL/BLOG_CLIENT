import styled from "styled-components";

export const Theme = styled.body`
  font-family: "Varela Round", sans-serif;
  height: 100%;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  button {
    color: ${(props) => props.theme.button.color};
    background: ${(props) => props.theme.button.background};
  }
`;
