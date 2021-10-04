import React, { useRef, useState, useEffect } from "react";
import styled, { css } from "styled-components";

type MenuHorAlign = "right" | "left";
type MenuVerAlign = "top" | "bottom";
type MenuEntrance = "none" | "top" | "left" | "right" | "bottom";

interface Props {
  children?: JSX.Element | JSX.Element[];
  items?: JSX.Element | JSX.Element[];
  horizontalAlign?: MenuHorAlign;
  verticalAlign?: MenuVerAlign;
  width?: number;
  unit?: "px" | "%";
  backdrop?: boolean;
  entrance?: MenuEntrance;
  relativeToParent?: boolean;
  toggleMenu?: boolean;
  closeClickingOutside?: boolean;
}

const Dropdown = ({
  children,
  items,
  width = 300,
  unit = "px",
  horizontalAlign = "left",
  verticalAlign = "top",
  entrance = "top",
  backdrop = false,
  relativeToParent = false,
  toggleMenu,
  closeClickingOutside = true,
}: Props) => {
  const dropdownRef = useRef<any>();
  const [isActive, setIsActive] = useState(false);

  const onClick = (e: any) => {
    setIsActive((prev) => !prev);
  };

  useEffect(() => {
    const pageClickEvent = (e: MouseEvent) => {
      // Si el menu esta visible y se clickeo fuera de el
      if (dropdownRef?.current && !dropdownRef?.current.contains(e.target))
        setIsActive((prev) => !prev);
    };

    // Una vez que el menu esta visible, se queda escuchando los
    // cambios en el evento click del window
    if (isActive && closeClickingOutside)
      window.addEventListener("click", pageClickEvent);

    return () => {
      closeClickingOutside &&
        window.removeEventListener("click", pageClickEvent);
    };
  }, [isActive]);

  useEffect(() => {
    if (toggleMenu !== undefined && toggleMenu !== isActive)
      setIsActive(toggleMenu);
  }, [toggleMenu]);

  return (
    <>
      {isActive && backdrop && <Backdrop />}
      <MenuContainer relativeToParent={relativeToParent}>
        {children && <div onClick={onClick}>{children}</div>}
        <Menu
          horizontalAlign={horizontalAlign}
          verticalAlign={verticalAlign}
          width={width}
          unit={unit}
          entrance={entrance}
          ref={dropdownRef}
          active={isActive}
        >
          <MenuList>{items}</MenuList>
        </Menu>
      </MenuContainer>
    </>
  );
};

export default Dropdown;

const MenuContainer = styled.div<{ relativeToParent: boolean }>`
  ${({ relativeToParent }) =>
    relativeToParent &&
    css`
      position: relative;
    `}
`;

const LeftAlign = css`
  left: 0;
  right: auto;
`;

const RightAlign = css`
  right: 0;
  left: auto;
`;

const TopAlign = css`
  top: 20px;
  bottom: auto;
`;

const BottomAlign = css`
  top: auto;
  bottom: 0;
`;

const MenuActive = css`
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
`;

const MenuHidden = css`
  height: 0;
`;

const getEntrance = (entrance: MenuEntrance) => {
  switch (entrance) {
    case "left":
      return css`
        transform: translateX(-20px);
      `;
    case "right":
      return css`
        transform: translateX(20px);
      `;
    case "top":
      return css`
        transform: translateY(-20px);
      `;
    case "bottom":
      return css`
        transform: translateY(20px);
      `;
    case "none":
    default:
      return css`
        transform: none;
        transition: none;
      `;
  }
};

const Menu = styled.nav<{
  active: boolean;
  horizontalAlign: MenuHorAlign;
  verticalAlign: MenuVerAlign;
  entrance: MenuEntrance;
  width: number;
  unit: string;
}>`
  background-color: #fff;
  position: absolute;
  //border-bottom-left-radius: 10px;
  //border-bottom-right-radius: 10px;
  z-index: 9999;
  width: ${({ width, unit }) => `${width}${unit}`};
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
  //box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.3);
  opacity: 0;
  visibility: hidden;
  overflow: hidden;
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;

  ${({ horizontalAlign }) =>
    horizontalAlign === "left" ? LeftAlign : RightAlign};
  ${({ verticalAlign }) => (verticalAlign === "top" ? TopAlign : BottomAlign)};
  ${({ entrance }) => getEntrance(entrance)};
  ${({ active }) => (active ? MenuActive : MenuHidden)};
`;

const MenuList = styled.ul`
  list-style: none;
  overflow: hidden;
  padding: 8px;
  margin: 0;
`;

export const MenuItem = styled.li`
  padding: 12px;
  color: #2f2f2f;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const MenuDivider = styled.div`
  height: 1px;
  background-color: #e9e9e9;
  padding: 0;
  margin: 4px 8px;
`;

const Backdrop = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.25);
`;
