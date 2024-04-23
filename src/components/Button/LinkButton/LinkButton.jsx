import { Link } from "react-router-dom";
import styled from "styled-components";
import { DefaultButton } from "../Button.style";

export default function LinkButton({ children, to = "/" }) {
  return (
    <Link to={to}>
      <StyledLinkButton>{children}</StyledLinkButton>
    </Link>
  );
}

const StyledLinkButton = styled.button`
  ${DefaultButton}
  background-color: var(--blue);

  &:focus,
  &:hover {
    background-color: var(--blue600);
  }
`;