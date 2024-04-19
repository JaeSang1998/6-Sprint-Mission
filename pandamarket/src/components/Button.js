import styled from "styled-components";

const CustomButton = styled.button`
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  padding: 12px 24px;
  color: #fff;
  background-color: #3692ff;
  border: none;
  cursor: pointer;
`;

function Button({ children, type }) {
  return <CustomButton type={type}>{children}</CustomButton>;
}

export default Button;
