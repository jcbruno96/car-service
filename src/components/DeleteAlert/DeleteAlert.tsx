import styled from "styled-components";
import { Button, Typography } from "..";
import Modal from "../Modal/Modal";

interface Props {
  open: boolean;
  text: string;
  cancelHandler: () => void;
  acceptHandler: () => void;
}

const DeleteAlert = ({ open, text, cancelHandler, acceptHandler }: Props) => {
  return (
    <Modal open={open} background="#fff">
      <ModalContent>
        <Typography variant="h5">{text}</Typography>
        <br />
        <br />
        <ButtonContainer>
          <Button
            color="light"
            fill="clear"
            clearOpacity={0}
            onClick={cancelHandler}
          >
            Cancelar
          </Button>
          <Button color="error" icon="trash" onClick={acceptHandler}>
            Eliminar
          </Button>
        </ButtonContainer>
      </ModalContent>
    </Modal>
  );
};

export default DeleteAlert;

const ModalContent = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
`;
