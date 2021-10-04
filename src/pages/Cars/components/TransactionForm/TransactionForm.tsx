import { Formik } from "formik";
import React from "react";
import styled from "styled-components";

import {
  Row,
  Col,
  Typography,
  Select,
  Checkbox,
  Button,
} from "../../../../components";
import { useTransactionForm } from "../../hooks/useTransactionForm";

interface Props {
  carId: number;
  cancelHandler: () => void;
  //savedHandler: () => void;
}

const TransactionForm = ({ carId, cancelHandler }: Props) => {
  const {
    formik: form,
    owners,
    services,
    getCost,
    updateServices,
  } = useTransactionForm(carId, (success: boolean) => {
    if (success) cancelHandler();
    else cancelHandler();
  });

  return (
    <Form onSubmit={form.handleSubmit}>
      <Row>
        <Col xs={12} style={{ alignItems: "flex-start" }}>
          <Typography variant="h6" color="primary">
            Nuevo servicio
          </Typography>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Select
            label="Propietario"
            placeholder="Seleccionar propietario"
            name="owner"
            data={owners}
            value={form.values.owner}
            errorText={form.errors?.owner}
            isError={!!form.errors?.owner && !!form.touched?.owner}
            onChange={form.handleChange}
          />
        </Col>
        <Col xs={12} style={{ alignItems: "flex-start" }}>
          <>
            <br />
            <Typography variant="label" style={{ marginBottom: 8 }}>
              Servicios
            </Typography>

            {services.map((service) => (
              <CheckboxContainer>
                <Checkbox
                  style={{ flex: 1 }}
                  label={service.name}
                  checked={form.values.services[service.id]?.checked}
                  onChange={() => updateServices(service)}
                />
                <Typography
                  variant="label"
                  color="medium"
                >{`$${service.cost}`}</Typography>
              </CheckboxContainer>
            ))}
            <CheckboxContainer>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">{`$${getCost()}`}</Typography>
            </CheckboxContainer>
          </>
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

export default TransactionForm;

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

const CheckboxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  width: 100%;
  border-bottom: 1px solid #eee;
`;
