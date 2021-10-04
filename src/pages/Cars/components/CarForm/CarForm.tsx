import styled from "styled-components";

import {
  Row,
  Col,
  Input,
  Button,
  Select,
  Typography,
  Checkbox,
} from "../../../../components";
import { Car } from "../../../../interfaces/cars";
import { useCarForm } from "../../hooks/useCarForm";

interface Props {
  car: Car | null;
  cancelHandler: () => void;
  savedHandler: () => void;
}

const CarForm = ({ car, cancelHandler, savedHandler }: Props) => {
  const { formik: form, brands } = useCarForm(
    car,
    (carId: number, success: boolean) => {
      if (success) savedHandler();
      else cancelHandler();
    }
  );

  return (
    <Form onSubmit={form.handleSubmit}>
      <Row>
        <Col xs={12} style={{ alignItems: "flex-start" }}>
          <Typography variant="h6" color="primary">
            {car ? "Edición del automotor" : "Nuevo automotor"}
          </Typography>
        </Col>
      </Row>
      <Row>
        <Col xs={12} style={{ padding: "0 6px" }}>
          <Select
            label="Marca"
            placeholder="Seleccionar marca"
            name="brandId"
            data={brands}
            value={form.values.brandId}
            errorText={form.errors?.brandId}
            helperText="Marca del vehículo"
            isError={!!form.errors?.brandId && !!form.touched?.brandId}
            onChange={form.handleChange}
          />
        </Col>
        <Col xs={12} style={{ padding: "0 6px" }}>
          <Input
            placeholder="Modelo"
            name="model"
            value={form.values.model}
            errorText={form.errors?.model}
            helperText="Modelo del vehículo"
            isError={!!form.errors?.model && !!form.touched?.model}
            onChange={form.handleChange}
          />
        </Col>
        <Col xs={12} style={{ padding: "0 6px" }}>
          <Input
            placeholder="Foto"
            name="picture"
            value={form.values.picture}
            errorText={form.errors?.picture}
            helperText="URL de la foto"
            isError={!!form.errors?.picture && !!form.touched?.picture}
            onChange={form.handleChange}
          />
        </Col>
        <Col xs={6} style={{ padding: "0 6px" }}>
          <Input
            placeholder="Patente"
            name="patent"
            value={form.values.patent}
            errorText={form.errors?.patent}
            isError={!!form.errors?.patent && !!form.touched?.patent}
            onChange={form.handleChange}
          />
        </Col>
        <Col xs={6} style={{ padding: "0 6px" }}>
          <Input
            placeholder="Color"
            name="color"
            value={form.values.color}
            errorText={form.errors?.color}
            isError={!!form.errors?.color && !!form.touched?.color}
            onChange={form.handleChange}
          />
        </Col>
        <Col xs={4} style={{ padding: "0 6px" }}>
          <Input
            placeholder="Kilometros"
            name="kilometers"
            type="number"
            value={form.values.kilometers}
            errorText={form.errors?.kilometers}
            isError={!!form.errors?.kilometers && !!form.touched?.kilometers}
            onChange={form.handleChange}
          />
        </Col>
        <Col xs={4} style={{ padding: "0px 6px" }}>
          <Input
            placeholder="Año"
            name="year"
            type="number"
            value={form.values.year}
            errorText={form.errors?.year}
            isError={!!form.errors?.year && !!form.touched?.year}
            onChange={form.handleChange}
          />
        </Col>
        <Col xs={4} style={{ padding: "12px 6px", alignSelf: "flex-end" }}>
          <Checkbox
            label="Automático"
            checked={form.values.automatic}
            onChange={() =>
              form.setFieldValue("automatic", !form.values.automatic)
            }
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
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

export default CarForm;

const Form = styled.form`
  padding: 16px 32px;
  background-color: white;
  height: 100%;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  margin-top: 32px;
  margin-bottom: 16px;
`;
