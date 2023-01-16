import styled from "styled-components";
import { COLORS, easyMove } from "constants/colors";

const MarkerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  font-size: 14px;
  color: #fff;
  text-transform: uppercase;
  background-size: cover;
  background-position: center;
  transition: transform 0.3s;
  animation: ${easyMove} 0.3s;

  &:hover {
    transform: scale(1.2);
  }
`;

export default MarkerStyled;
