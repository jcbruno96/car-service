import React from "react";
import styled from "styled-components";

interface Props {
  open: boolean;
  background?: string;
  children: string | JSX.Element | JSX.Element[];
  style?: React.CSSProperties;
  onClick?: () => void;
}

const Modal = ({
  open,
  background = "light",
  children,
  style,
  onClick,
}: Props) => {
  return (
    <Container open={open} onClick={() => onClick && onClick()}>
      <ModalContent
        background={background}
        style={style}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </ModalContent>
    </Container>
  );
};

export default Modal;

const Container = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? "flex" : "none")};
  position: fixed;
  z-index: 99999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div<{ background: string }>`
  background-color: ${({ background }) => background};
  border-radius: 8px;
  max-width: 70%;
  min-width: 320px;
  max-height: 90%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation: appear 0.4s;
  overflow-y: auto;

  @keyframes appear {
    0% {
      transform: translateY(-300px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 576px) {
    max-width: 85%;
  }
`;
