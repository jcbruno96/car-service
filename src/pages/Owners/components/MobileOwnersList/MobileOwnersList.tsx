import React, { useState } from "react";
import styled, { useTheme } from "styled-components";

import { Owner } from "../../../../interfaces/owners";

import {
  Collapse,
  Icon,
  ListContainer,
  ListItem,
  ListRow,
  Typography,
} from "../../../../components";
import OwnerOptions from "../OwnerOptions/OwnerOptions";

const cols = [
  { min: "70px", max: "70px" },
  { min: "120px", max: "1fr" },
  { min: "110px", max: "110px" },
];

interface Props {
  owners: Owner[];
  deleteHandler: (owner: Owner) => void;
  editHandler: (owner: Owner) => void;
}

const OwnersList = ({ owners, deleteHandler, editHandler }: Props) => {
  const { palette } = useTheme();

  const [ownerExpanded, setOwnerExpanded] = useState(-1);

  const toggleOwner = (ownerId: number) => {
    if (ownerId === ownerExpanded) setOwnerExpanded(-1);
    else setOwnerExpanded(ownerId);
  };

  return (
    <ListContainer>
      {owners.map((owner) => (
        <React.Fragment key={owner.id}>
          <ListRow cols={cols}>
            <ListItem>
              <ImageContainer>
                <Image
                  src={owner?.picture || "https://i.stack.imgur.com/y9DpT.jpg"}
                  alt="logo"
                />
              </ImageContainer>
            </ListItem>
            <ListItem>
              <Typography variant="h6">{owner.lastName}</Typography>
              <Typography variant="p">{owner.firstName}</Typography>
            </ListItem>
            <ListItem>
              <IconsContainer>
                <Icon
                  icon="eye"
                  size={18}
                  color={palette.dark.color}
                  onClick={() => toggleOwner(owner.id || -1)}
                />
                <OwnerOptions
                  owner={owner}
                  deleteHandler={deleteHandler}
                  editHandler={editHandler}
                />
              </IconsContainer>
            </ListItem>
          </ListRow>
          <Collapse isOpen={ownerExpanded === owner.id}>
            <DetailContainer>
              <DetailItem>
                <DetailIcon>
                  <Icon icon="envelope" size={16} color={palette.dark.color} />
                </DetailIcon>
                <Typography variant="label">{owner.email}</Typography>
              </DetailItem>
              <DetailItem>
                <DetailIcon>
                  <Icon icon="phone" size={16} color={palette.dark.color} />
                </DetailIcon>
                <Typography variant="p">{owner.phone}</Typography>
              </DetailItem>
            </DetailContainer>
          </Collapse>
        </React.Fragment>
      ))}
    </ListContainer>
  );
};

export default OwnersList;

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
