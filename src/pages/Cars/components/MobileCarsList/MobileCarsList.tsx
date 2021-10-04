import React, { useState } from "react";
import styled, { useTheme } from "styled-components";

import { Car } from "../../../../interfaces/cars";

import {
  Collapse,
  Icon,
  ListContainer,
  ListItem,
  ListRow,
  Typography,
} from "../../../../components";
import CarOptions from "../CarOptions/CarOptions";

const cols = [
  { min: "70px", max: "70px" },
  { min: "120px", max: "1fr" },
  { min: "110px", max: "110px" },
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
  const { palette } = useTheme();

  const [carExpanded, setCarExpanded] = useState(-1);

  const toggleCar = (carId: number) => {
    if (carId === carExpanded) setCarExpanded(-1);
    else setCarExpanded(carId);
  };

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
              <IconsContainer>
                <Icon
                  icon="eye"
                  size={18}
                  color={palette.dark.color}
                  onClick={() => toggleCar(car.id || -1)}
                />
                <CarOptions
                  car={car}
                  deleteHandler={deleteHandler}
                  editHandler={editHandler}
                  addTransactionHandler={addTransactionHandler}
                  viewDetailHandler={viewDetailHandler}
                />
              </IconsContainer>
            </ListItem>
          </ListRow>
          <Collapse isOpen={carExpanded === car.id}>
            <DetailContainer>
              <DetailItem>
                <DetailIcon>
                  <Icon icon="passport" size={16} color={palette.dark.color} />
                </DetailIcon>
                <Typography variant="label">{car.patent}</Typography>
              </DetailItem>
              <DetailItem>
                <DetailIcon>
                  <Icon icon="history" size={16} color={palette.dark.color} />
                </DetailIcon>
                <Typography variant="p">{car.year || ""}</Typography>
              </DetailItem>
              <DetailItem>
                <DetailIcon>
                  <Icon icon="ruler" size={16} color={palette.dark.color} />
                </DetailIcon>
                <Typography variant="p">{`${
                  car.kilometers || 0
                }km`}</Typography>
              </DetailItem>
              <DetailItem>
                <DetailIcon>
                  <Icon icon="box" size={16} color={palette.dark.color} />
                </DetailIcon>
                <Typography variant="p">{`${
                  car.automatic ? "Automática" : "Manual"
                }`}</Typography>
              </DetailItem>
            </DetailContainer>
          </Collapse>
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
  gap: 32px;
  padding: 0 8px;
`;

const DetailContainer = styled.div`
  padding: 8px 48px;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 8px 0;
`;

const DetailIcon = styled.div`
  width: 50px;
`;
