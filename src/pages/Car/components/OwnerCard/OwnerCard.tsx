import styled from "styled-components";
import { Typography } from "../../../../components";

import { Owner } from "../../../../interfaces/owners";

interface Props {
  owner: Owner;
}

const OwnerCard = ({ owner }: Props) => {
  return (
    <Card>
      <Image
        src={owner?.picture || "https://i.stack.imgur.com/y9DpT.jpg"}
        alt="owner picture"
      />
      <TextContainer>
        <Typography variant="h6">{`${owner.firstName} ${owner.lastName}`}</Typography>
        <Typography variant="p" style={{ fontSize: 13 }}>
          {owner.email}
        </Typography>
      </TextContainer>
    </Card>
  );
};

export default OwnerCard;

const Card = styled.div`
  padding: 12px 16px;
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
