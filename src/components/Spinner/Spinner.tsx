import styled from "styled-components";

import { Colors } from "../../theme";

const Spinner = styled.div<{ size: number; color: Colors }>`
  border: 2px solid
    ${({ theme: { palette }, color }) =>
      color ? palette[color].color : palette.primary.color};
  width: ${({ size }) => size || 20}px;
  height: ${({ size }) => size || 20}px;
  border-radius: 50%;
  border-left-color: rgba(0, 0, 0, 0.1);
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
