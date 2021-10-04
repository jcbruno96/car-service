import styled, { useTheme } from "styled-components";

import { Owner } from "../../../../interfaces/owners";

import {
  Icon,
  ListContainer,
  ListItem,
  ListRow,
  Typography,
} from "../../../../components";
import React from "react";
import OwnerOptions from "../OwnerOptions/OwnerOptions";

const cols = [
  { min: "80px", max: "80px" },
  { min: "150px", max: "1fr" },
  { min: "150px", max: "1fr" },
  { min: "150px", max: "150px" },
  { min: "80px", max: "80px" },
];

interface Props {
  owners: Owner[];
  deleteHandler: (owner: Owner) => void;
  editHandler: (owner: Owner) => void;
}

const OwnersList = ({ owners, deleteHandler, editHandler }: Props) => {
  const theme = useTheme();

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
              <Typography variant="p">{owner.email}</Typography>
            </ListItem>
            <ListItem>
              <Typography variant="p">{owner.phone}</Typography>
            </ListItem>

            <ListItem>
              <OwnerOptions
                owner={owner}
                deleteHandler={deleteHandler}
                editHandler={editHandler}
              />
            </ListItem>
          </ListRow>
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
  padding: 0 16px;
`;
