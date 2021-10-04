import React from "react";
import styled from "styled-components";

export type IconType = "solid" | "regular" | "light" | "brands";

const StyledIcon = styled.i<{ color: string; size: number }>`
  color: ${({ color }) => color ?? "white"};
  font-size: ${({ size }) => size || 16}px;
  text-align: center;
`;

interface Props {
  icon: string;
  color?: string;
  size?: number;
  type?: IconType;
  style?: React.CSSProperties;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const Icon = ({
  icon,
  color = "white",
  size = 20,
  type = "solid",
  style,
  className,
  onClick,
}: Props) => {
  return (
    <StyledIcon
      color={color}
      size={size}
      style={style}
      onClick={onClick}
      className={`${
        type === "solid"
          ? "fas"
          : type === "regular"
          ? "far"
          : type === "brands"
          ? "fab"
          : "fal"
      } fa-${icon} ${className}`}
    />
  );
};

export default Icon;
