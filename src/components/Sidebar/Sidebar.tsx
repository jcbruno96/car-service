import {
  ProSidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

import styled, { css, useTheme } from "styled-components";
import { colorOpacity } from "../../theme";

import Icon from "../Icon/Icon";

export type MenuOption = "cars" | "owners";

interface Props {
  collapsed: boolean;
  toggled: boolean;
  actualMenu: MenuOption;
  handleToggle: () => void;
  handleCollapse: () => void;
  handleOnMenuChange: (option: MenuOption) => void;
}

const Sidebar = ({
  collapsed,
  toggled,
  actualMenu = "cars",
  handleToggle,
  handleCollapse,
  handleOnMenuChange,
}: Props) => {
  const theme = useTheme();

  return (
    <StyledSidebar
      collapsed={collapsed}
      toggled={toggled}
      onToggle={handleToggle}
      breakPoint="lg"
    >
      <SidebarHeader style={{ border: "none " }}>
        <ImageContainer>
          <img
            src="https://pickit.com.ar/assets/PICKIT_NARANJA.svg"
            alt="logo"
          />
        </ImageContainer>
      </SidebarHeader>
      <SidebarContent>
        <MenuItem
          selected={actualMenu === "cars"}
          onClick={() => handleOnMenuChange("cars")}
        >
          <Icon
            icon="car"
            color={
              actualMenu === "cars"
                ? theme.palette.primary.contrast
                : theme.palette.medium.color
            }
          />
          <MenuItemText>Automotores</MenuItemText>
        </MenuItem>
        <MenuItem
          selected={actualMenu === "owners"}
          onClick={() => handleOnMenuChange("owners")}
        >
          <Icon
            icon="user"
            color={
              actualMenu === "owners"
                ? theme.palette.primary.contrast
                : theme.palette.medium.color
            }
          />
          <MenuItemText>Propietarios</MenuItemText>
        </MenuItem>
        {/* <Menu iconShape="round">
          <MenuItem icon={<Icon icon="car" />}>Autos</MenuItem>
          <MenuItem icon={<Icon icon="user" />}>Propietarios</MenuItem>
        </Menu> */}
      </SidebarContent>
      {/* <SidebarFooter style={{ border: "none " }}>
        <CollapseContainer onClick={handleCollapse}>
          <Icon icon={collapsed ? "chevron-right" : "chevron-left"}></Icon>
        </CollapseContainer>
      </SidebarFooter> */}
    </StyledSidebar>
  );
};

export default Sidebar;

const StyledSidebar = styled(ProSidebar)`
  & > .pro-sidebar-inner {
    background-color: ${({ theme }) => theme.body};
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  padding: 8px 32px;
`;

const MenuItem = styled.div<{ selected?: boolean }>`
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: flex-start;
  width: calc(100% - 32px);
  height: 48px;
  padding: 0px 15px;
  margin: 8px 16px;
  border-radius: 8px;
  transition: all 0.2s ease-in;

  ${({ theme, selected }) =>
    selected
      ? css`
          background-color: ${theme.palette.primary.color};

          & > ${MenuItemText} {
            color: ${theme.palette.primary.contrast};
          }

          &:hover {
            background-color: ${({ theme }) =>
              colorOpacity(theme.palette.primary.color, 0.9)};
          }
        `
      : css`
          & > ${MenuItemText} {
            color: ${theme.palette.medium.contrast};
          }

          &:hover {
            background-color: ${({ theme }) =>
              colorOpacity(theme.palette.medium.color, 0.1)};
          }
        `}
`;

const MenuItemText = styled.p`
  flex: 1;
  margin: 0;
  font-size: 18px;
  padding: 0 32px;
`;
