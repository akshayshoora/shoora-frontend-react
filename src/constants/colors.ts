import { keyframes } from "@emotion/react";

export const COLORS = {
  BORDER_GREY: '#ECEBF1',
  PRIMARY_FONT: '#261F5A',
  SECONDARY_FONT: '#746E97',
  PRIMARY_COLOR: '#261F5A',
  WHITE: '#FFFFFF',
  BLACK: '#000',
  ERROR:'red',
  GRADIENT: 'linear-gradient(to right, #a36040,#7a4700)',
  HEADER:'linear-gradient(to right, #ec6a2b,#1723b1)',
  BUTTON:'#8e5323',
  gray64: '#a3a3a3',
};

export default COLORS;

export const easyMove = keyframes`
  from {
    transform: translateY(-20%);
    opacity: 0;
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
