import React from "react";
import styled, { useTheme } from "styled-components";
import { Icon } from "../../../../components";
import Dropdown, { MenuItem } from "../../../../components/Dropdown/Dropdown";
import { useResponsive } from "../../../../hooks/useResponsive/useResponsive";
import { Owner } from "../../../../interfaces/owners";

interface Props {
  owner: Owner;
  deleteHandler: (owner: Owner) => void;
  editHandler: (owner: Owner) => void;
}

const OwnerOptions = ({ owner, deleteHandler, editHandler }: Props) => {
  const { palette } = useTheme();
  const { isMobile } = useResponsive();

  const getItems = () => {
    return (
      <>
        <MenuItem onClick={() => deleteHandler(owner)}>
          <StyledIcon icon="trash" color={palette.medium.color} size={14} />
          Eliminar
        </MenuItem>
        <MenuItem onClick={() => editHandler(owner)}>
          <StyledIcon icon="edit" color={palette.medium.color} size={14} />
          Editar
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

export default OwnerOptions;

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledIcon = styled(Icon)`
  margin-right: 16px;
`;
