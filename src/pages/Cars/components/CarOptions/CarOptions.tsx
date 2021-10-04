import React from "react";
import styled, { useTheme } from "styled-components";
import { Icon } from "../../../../components";
import Dropdown, { MenuItem } from "../../../../components/Dropdown/Dropdown";
import { useResponsive } from "../../../../hooks/useResponsive/useResponsive";
import { Car } from "../../../../interfaces/cars";

interface Props {
  car: Car;
  deleteHandler: (car: Car) => void;
  editHandler: (car: Car) => void;
  addTransactionHandler: (car: Car) => void;
  viewDetailHandler: (carId: number) => void;
}

const CarOptions = ({
  car,
  deleteHandler,
  editHandler,
  addTransactionHandler,
  viewDetailHandler,
}: Props) => {
  const { palette } = useTheme();
  const { isMobile } = useResponsive();

  const getItems = () => {
    return (
      <>
        <MenuItem onClick={() => deleteHandler(car)}>
          <StyledIcon icon="trash" color={palette.medium.color} size={14} />
          Eliminar
        </MenuItem>
        <MenuItem onClick={() => editHandler(car)}>
          <StyledIcon icon="edit" color={palette.medium.color} size={14} />
          Editar
        </MenuItem>
        <MenuItem onClick={() => addTransactionHandler(car)}>
          <StyledIcon icon="plus" color={palette.medium.color} size={14} />
          Servicio
        </MenuItem>
        <MenuItem onClick={() => viewDetailHandler(car.id!)}>
          <StyledIcon icon="eye" color={palette.primary.color} size={14} />
          Ver Detalle
        </MenuItem>
      </>
    );
  };

  return (
    <Dropdown
      items={getItems()}
      width={isMobile ? 100 : 220}
      unit={isMobile ? "%" : "px"}
      horizontalAlign="right"
      verticalAlign={isMobile ? "bottom" : "top"}
      entrance={isMobile ? "bottom" : "top"}
      backdrop={isMobile}
      relativeToParent={!isMobile}
    >
      <IconContainer>
        <Icon icon="ellipsis-v" color={palette.medium.color} />
      </IconContainer>
    </Dropdown>
  );
};

export default CarOptions;

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledIcon = styled(Icon)`
  margin-right: 16px;
`;
