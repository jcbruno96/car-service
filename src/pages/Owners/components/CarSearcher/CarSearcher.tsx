import { useState } from "react";
import {
  Button,
  Col,
  Grid,
  Input,
  Row,
  Typography,
} from "../../../../components";
import { Car } from "../../../../interfaces/cars";
import { getCarByPatent } from "../../../../services/cars";
import CarCard from "../CarCard/CarCard";

interface Props {
  cars: Car[];
  addCar: (car: Car) => void;
  deleteCar: (carId: number) => void;
}

const CarSearcher = ({ cars, deleteCar, addCar }: Props) => {
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState(false);

  const searchCar = async () => {
    try {
      const response = await getCarByPatent(searchInput);
      const results = response.data;
      if (results.length === 0) setError(true);
      else {
        console.log("CAR: ", results[0]);
        addCar(results[0]);
        setSearchInput("");
      }
    } catch (err) {
      console.log("Error: ", err);
      setError(true);
    }
    console.log("Search car");
  };

  const onSearchChange = (value: string) => {
    setError(false);
    setSearchInput(value);
  };

  return (
    <Grid style={{ marginTop: 32 }}>
      <Row>
        <Col xs={12} style={{ alignItems: "flex-start" }}>
          <Typography variant="h6" color="primary">
            Mis vehículos
          </Typography>
        </Col>
        <Col
          xs={12}
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            paddingTop: 0,
          }}
        >
          <Input
            placeholder="Buscar por patente"
            value={searchInput}
            errorText="No existe la patente"
            isError={error}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <Button
            style={{ marginLeft: 16, marginTop: 16 }}
            icon="plus"
            color="secondary"
            fill="outline"
            onClick={searchCar}
          >
            Agregar
          </Button>
        </Col>
        <Col xs={12}>
          {cars?.map((car) => (
            <CarCard car={car} deleteCar={deleteCar} />
          ))}
        </Col>
      </Row>
    </Grid>
  );
};

export default CarSearcher;
