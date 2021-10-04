import styled, { useTheme } from "styled-components";

import { Car } from "../../../../interfaces/cars";

import {
  Icon,
  ListContainer,
  ListItem,
  ListRow,
  Typography,
} from "../../../../components";
import React, { useContext } from "react";
import CarOptions from "../CarOptions/CarOptions";

const cols = [
  { min: "80px", max: "80px" },
  { min: "150px", max: "1fr" },
  { min: "150px", max: "150px" },
  { min: "100px", max: "120px" },
  { min: "120px", max: "150px" },
  { min: "100px", max: "160px" },
  { min: "80px", max: "80px" },
];

interface Props {
  cars: Car[];
  deleteHandler: (car: Car) => void;
  editHandler: (car: Car) => void;
  addTransactionHandler: (car: Car) => void;
  viewDetailHandler: (carId: number) => void;
}

const CarsList = ({
  cars,
  deleteHandler,
  editHandler,
  addTransactionHandler,
  viewDetailHandler,
}: Props) => {
  return (
    <ListContainer>
      {cars.map((car) => (
        <React.Fragment key={car.id}>
          <ListRow cols={cols}>
            <ListItem>
              <ImageContainer>
                <Image
                  src={car?.picture || "https://i.stack.imgur.com/y9DpT.jpg"}
                  alt="logo"
                />
              </ImageContainer>
            </ListItem>
            <ListItem>
              <Typography variant="h5">{car.model}</Typography>
              <Typography variant="p">{car.brand?.name || ""}</Typography>
            </ListItem>
            <ListItem>
              <Typography variant="p">Patente</Typography>
              <Typography variant="label">{car.patent}</Typography>
            </ListItem>
            <ListItem>
              <YearContainer>
                <Typography variant="p">{car.year || ""}</Typography>
              </YearContainer>
            </ListItem>
            <ListItem>
              <Typography variant="p">Kilómetros</Typography>
              <Typography variant="label">{car.kilometers || 0}</Typography>
            </ListItem>

            <ListItem>
              <Typography variant="p">Caja</Typography>
              <Typography variant="label">
                {car.automatic ? "Automática" : "Manual"}
              </Typography>
            </ListItem>
            <ListItem>
              <CarOptions
                car={car}
                deleteHandler={deleteHandler}
                editHandler={editHandler}
                addTransactionHandler={addTransactionHandler}
                viewDetailHandler={viewDetailHandler}
              />
            </ListItem>
          </ListRow>
        </React.Fragment>
      ))}
    </ListContainer>
  );
};

export default CarsList;

const ImageContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 16px;
`;

const YearContainer = styled.div`
  padding: 2px 6px;
  border-radius: 4px;
  width: fit-content;
  background-color: ${({ theme }) => theme.palette.secondary.color};

  & > * {
    color: ${({ theme }) => theme.palette.secondary.contrast};
  }
`;
