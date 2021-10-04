import styled, { useTheme } from "styled-components";
import { Icon, Typography } from "../../../../components";
import { Car } from "../../../../interfaces/cars";

interface Props {
  car: Car;
  deleteCar: (carId: number) => void;
}

const CarCard = ({ car, deleteCar }: Props) => {
  const theme = useTheme();
  return (
    <Card>
      <Image
        src={car?.picture || "https://i.stack.imgur.com/y9DpT.jpg"}
        alt="car picture"
      />
      <TextContainer>
        <Typography variant="h6">{car?.model}</Typography>
        <Typography variant="p" style={{ fontSize: 13 }}>
          {car?.patent}
        </Typography>
      </TextContainer>
      <Icon
        icon="times"
        color={theme.palette.medium.color}
        onClick={() => deleteCar(car?.id!)}
      />
    </Card>
  );
};

export default CarCard;

const Card = styled.div`
  padding: 8px 16px;
  margin: 6px 0;
  width: 100%;
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #e9e9e9;
`;

const Image = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 100%;
  object-fit: cover;
  margin-right: 16px;
`;

const TextContainer = styled.div`
  flex: 1;
`;
