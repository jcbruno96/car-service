import styled from "styled-components";
import { Typography } from "../../../../components";

import { Transaction } from "../../../../interfaces/services";

const months = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

interface Props {
  service: Transaction;
}

const ServiceCard = ({ service }: Props) => {
  const getDate = () => {
    const date = new Date(service.timestamp);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
  };

  return (
    <Card>
      <CardHeader>
        <div>
          <Typography variant="label">{`${service?.owner?.firstName} ${service?.owner?.lastName}`}</Typography>
          <Typography variant="p" style={{ fontSize: 13 }}>
            {getDate()}
          </Typography>
        </div>
        <Cost>${service?.cost}</Cost>
      </CardHeader>
      <div style={{ width: "100%" }}>
        {service?.services?.map((s) => (
          <Service>
            <Typography variant="label">{s.name}</Typography>
            <Typography variant="p">{`$${s.cost}`}</Typography>
          </Service>
        ))}
      </div>
    </Card>
  );
};

export default ServiceCard;

const Card = styled.div`
  padding: 12px 16px;
  margin: 6px 0;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #e1e1e1;
  //box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05), 0 6px 10px 0 rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid #e1e1e1;
  margin-bottom: 8px;
  padding-bottom: 8px;
`;

const Cost = styled.h6`
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 15px;
  background-color: ${({ theme }) => theme.palette.secondary.color};
  color: ${({ theme }) => theme.palette.secondary.contrast};
`;

const Service = styled.div`
  padding: 4px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
