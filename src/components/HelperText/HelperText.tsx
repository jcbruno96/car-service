import styled from "styled-components";

const HelperText = styled.p<{ isError: boolean }>`
  margin: 2px 4px;
  font-size: 12px;
  color: ${({ theme: { palette }, isError }) =>
    isError ? palette.error.color : palette.medium.color};
`;

export default HelperText;
