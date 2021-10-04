import styled from "styled-components";
import { Grid, Row, Col, Typography } from "../../../../components";
import { Car } from "../../../../interfaces/cars";

interface Props {
  car: Car | null;
}

const CarDetail = ({ car }: Props) => {
  return (
    <>
      <Grid>
        <Row>
          <Col xs={12} style={{ alignItems: "flex-start" }}>
            <Typography variant="h4" color="primary">
              {car?.model || ""}
            </Typography>
            <Typography variant="h6">{car?.brand?.name || ""}</Typography>
          </Col>
        </Row>
      </Grid>
      <StyledGrid>
        <Row>
          <Col xs={12} style={{ alignItems: "flex-start" }}>
            <Typography variant="p" color="primary">
              Ficha técnica
            </Typography>
          </Col>
          <Col xs={4} style={{ alignItems: "flex-start" }}>
            <Typography variant="p">Patente</Typography>
            <Typography variant="label">{car?.patent || ""}</Typography>
          </Col>
          <Col xs={8} style={{ alignItems: "flex-start" }}>
            <Typography variant="p">Caja</Typography>
            <Typography variant="label">
              {car?.automatic ? "Automática" : "Manual"}
            </Typography>
          </Col>
          <Col xs={4} style={{ alignItems: "flex-start" }}>
            <Typography variant="p">Kilómetros</Typography>
            <Typography variant="label">{car?.kilometers || 0}</Typography>
          </Col>
          <Col xs={4} style={{ alignItems: "flex-start" }}>
            <Typography variant="p">Año</Typography>
            <Typography variant="label">{car?.year || ""}</Typography>
          </Col>
          <Col xs={4} style={{ alignItems: "flex-start" }}>
            <Typography variant="p">Color</Typography>
            <Typography variant="label">{car?.color || ""}</Typography>
          </Col>
        </Row>
      </StyledGrid>
    </>
  );
};

export default CarDetail;

const StyledGrid = styled(Grid)`
  //background-color: #f9f9f9;
  padding: 8px;
  margin-top: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;
