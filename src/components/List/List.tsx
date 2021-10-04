import styled from "styled-components";

type ColumnSize = {
  min: string;
  max: string;
};

const getColumnSize = (columns: ColumnSize[]) => {
  let sizes = "";
  for (const col of columns) {
    sizes += `minmax(${col.min}, ${col.max})
    `;
  }
  sizes += ";";

  return sizes;
};

export const ListItem = styled.div`
  padding: 8px;
  text-align: left;
  align-self: center;
`;

export const ListRow = styled.div<{
  cols: ColumnSize[];
}>`
  display: grid;
  border-collapse: collapse;
  min-width: 100%;
  padding: 4px 16px;
  border-bottom: 1px solid #e9e9e9;
  background-color: transparent;
  grid-template-columns: ${({ cols }) => getColumnSize(cols)};
`;

export const ListContainer = styled.div`
  height: 100%;
  overflow-x: auto;
  background-color: ${({ theme }) => theme.palette.light.color};
  border-radius: 8px;

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    height: 5px;
    width: 5px;
  }
  &::-webkit-scrollbar {
    background-color: #f1f1f1;
    height: 5px;
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
  }
`;
