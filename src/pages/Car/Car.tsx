import React from "react";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";

import { Button, Col, Grid, Row, Typography } from "../../components";
import CarDetail from "./components/CarDetail/CarDetail";
import OwnerCard from "./components/OwnerCard/OwnerCard";
import ServiceCard from "./components/ServiceCard/ServiceCard";

import { useCar } from "./hooks/useCar";

const Car = () => {
  const history = useHistory();
  const { carId } = useParams<{ carId: string }>();
  const { loading, car, owners, services } = useCar(carId);

  return (
    <div>
      <div>
        <Button
          color="primary"
          fill="clear"
          icon="chevron-left"
          clearOpacity={0}
          effect={false}
          onClick={() => history.goBack()}
        >
          Regresar
        </Button>
      </div>
      <StyledGrid>
        <Row style={{ alignItems: "flex-start" }}>
          <Col xs={12} md={6}>
            <CarDetail car={car} />
          </Col>
          <Col xs={12} md={6}>
            <Photo
              src={car?.picture || "https://i.stack.imgur.com/y9DpT.jpg"}
              alt="picture"
            />
          </Col>
        </Row>
        <br />
        <br />
        <Row style={{ alignItems: "flex-start" }}>
          <Col xs={12} md={6} style={{ alignItems: "flex-start" }}>
            <>
              <Typography variant="h6" style={{ marginBottom: 8 }}>
                Propietarios
              </Typography>
              {owners.map((owner) => (
                <OwnerCard key={owner.id} owner={owner} />
              ))}
            </>
          </Col>
          <Col xs={12} md={6} style={{ alignItems: "flex-start" }}>
            <>
              <Typography variant="h6" style={{ marginBottom: 8 }}>
                Servicios realizados
              </Typography>
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </>
          </Col>
        </Row>
      </StyledGrid>
    </div>
  );
};

export default Car;

const StyledGrid = styled(Grid)`
  padding: 16px 0;
  max-width: 80%;
  margin: auto;

  @media (max-width: 768px) {
    max-width: 95%;
  }
`;

const Photo = styled.img`
  height: 100%;
  max-height: 600px;
  max-width: 100%;
  object-fit: cover;
`;
