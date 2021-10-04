import styled from "styled-components";

import { Row, Col, Input, Button, Typography } from "../../../../components";
import { Owner } from "../../../../interfaces/owners";
import { useOwnerForm } from "../../hooks/useOwnerForm";
import CarSearcher from "../CarSearcher/CarSearcher";

interface Props {
  owner: Owner | null;
  cancelHandler: () => void;
  savedHandler: () => void;
}

const OwnerForm = ({ owner, cancelHandler, savedHandler }: Props) => {
  const {
    formik: form,
    addCar,
    deleteCar,
  } = useOwnerForm(owner, (ownerId: number, success: boolean) => {
    if (success) savedHandler();
    else cancelHandler();
  });

  return (
    <Form onSubmit={form.handleSubmit}>
      <Row>
        <Col xs={12} style={{ alignItems: "flex-start" }}>
          <Typography variant="h6" color="primary">
            {owner ? "Edición del propietario" : "Nuevo propietario"}
          </Typography>
        </Col>
      </Row>
      <Row>
        <Col xs={6} style={{ padding: "0 6px" }}>
          <Input
            placeholder="Nombre"
            name="firstName"
            value={form.values.firstName}
            errorText={form.errors?.firstName}
            helperText="Nombre"
            isError={!!form.errors?.firstName && !!form.touched?.firstName}
            onChange={form.handleChange}
          />
        </Col>
        <Col xs={6} style={{ padding: "0 6px" }}>
          <Input
            placeholder="Apellido"
            name="lastName"
            value={form.values.lastName}
            errorText={form.errors?.lastName}
            helperText="Apellido"
            isError={!!form.errors?.lastName && !!form.touched?.lastName}
            onChange={form.handleChange}
          />
        </Col>
        <Col xs={12} style={{ padding: "0 6px" }}>
          <Input
            placeholder="Foto"
            name="picture"
            value={form.values.picture}
            errorText={form.errors?.picture}
            helperText="URL de la foto de perfil"
            isError={!!form.errors?.picture && !!form.touched?.picture}
            onChange={form.handleChange}
          />
        </Col>
        <Col xs={6} style={{ padding: "0 6px" }}>
          <Input
            placeholder="Email"
            name="email"
            value={form.values.email}
            errorText={form.errors?.email}
            helperText="Correo eléctronico"
            isError={!!form.errors?.email && !!form.touched?.email}
            onChange={form.handleChange}
          />
        </Col>
        <Col xs={6} style={{ padding: "0 6px" }}>
          <Input
            placeholder="Teléfono"
            name="phone"
            value={form.values.phone}
            errorText={form.errors?.phone}
            helperText="Preferentemente celular"
            isError={!!form.errors?.phone && !!form.touched?.phone}
            onChange={form.handleChange}
          />
        </Col>
      </Row>
      <CarSearcher
        cars={form.values.cars}
        deleteCar={deleteCar}
        addCar={addCar}
      />
      <Row>
        <Col xs={12} style={{ alignItems: "flex-end" }}>
          <ButtonContainer>
            <Button
              type="button"
              color="light"
              fill="clear"
              clearOpacity={0}
              onClick={cancelHandler}
            >
              Cancelar
            </Button>
            <Button type="submit" color="primary">
              Guardar
            </Button>
          </ButtonContainer>
        </Col>
      </Row>
    </Form>
  );
};

export default OwnerForm;

const Form = styled.form`
  padding: 16px 32px;
  background-color: white;
  height: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 32px;
  margin-bottom: 16px;
`;
