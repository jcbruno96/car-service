import styled from "styled-components";

import Typography from "../Typography/Typography";
import Spinner from "../Spinner/Spinner";
import { Colors } from "../../theme";

const LoadingContainer = styled.div`
  width: 100%;
  padding: 16px 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

interface Props {
  text?: string;
  color?: Colors;
}

const Loading = ({ text = "Please wait...", color = "primary" }: Props) => {
  return (
    <LoadingContainer>
      <Spinner color={color} size={24} />
      <br />
      <Typography variant="label">{text}</Typography>
    </LoadingContainer>
  );
};

export default Loading;
