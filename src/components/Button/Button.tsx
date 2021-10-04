import React, { useRef } from "react";
import styled, { css } from "styled-components";
import { Colors, colorOpacity } from "../../theme";

import Icon, { IconType } from "../Icon/Icon";
import Spinner from "../Spinner/Spinner";

export type ButtonType = "button" | "reset" | "submit";
export type ButtonFill = "clear" | "outline" | "solid";
export type ButtonShape = "round" | "semi-round" | "square";

const ButtonText = styled.p`
  margin: 0;
  font-size: 16px;
`;

const StyledButton = styled.button<{
  color: Colors;
  shape: ButtonShape;
  fill: ButtonFill;
  clearOpacity: number;
  hasText: boolean;
  effect: boolean;
  width: number;
}>`
  display: flex;
  width: fit-content;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  outline: none;
  opacity: 1;
  cursor: pointer;
  box-sizing: border-box;
  border-radius: ${({ shape }) =>
    shape === "round" ? 24 : shape === "semi-round" ? 8 : 0}px;
  transition: all 0.5s ease;

  i {
    transition: color 0.8s;
    margin-right: ${({ hasText }) => (hasText ? "8px" : "0")};
  }

  ${({ theme, color, fill, clearOpacity }) => {
    switch (fill) {
      case "clear":
        return css`
          background-color: ${colorOpacity(
            theme.palette[color].color,
            clearOpacity
          )};
          border: 1px solid transparent;
          color: ${theme.palette[color].color};

          i {
            color: ${theme.palette[color].color};
          }
        `;
      case "outline":
        return css`
          background-color: transparent;
          border: 1px solid ${theme.palette[color].color};
          color: ${theme.palette[color].color};

          i {
            color: ${theme.palette[color].color};
          }
        `;
      case "solid":
      default:
        return css`
          background-color: ${theme.palette[color].color};
          border: 1px solid ${theme.palette[color].color};
          color: ${theme.palette[color].contrast};

          i {
            color: ${theme.palette[color].contrast};
          }
        `;
    }
  }}

  &:hover {
    ${({ effect, theme, color, fill, width }) => {
      if (!effect) return css``;

      switch (fill) {
        case "clear":
          return css`
            color: ${theme.palette[color].contrast};
            box-shadow: inset ${width + 10}px 0 0 0
              ${theme.palette[color].color};
            transition: box-shadow 0.8s, color 0.7s;

            i {
              color: ${theme.palette[color].contrast};
            }
          `;
        case "outline":
          return css`
            border: 1px solid ${theme.palette[color].color};
            color: ${theme.palette[color].contrast};
            box-shadow: inset ${width + 10}px 0 0 0
              ${theme.palette[color].color};
            transition: box-shadow 0.8s, color 0.7s;

            i {
              color: ${theme.palette[color].contrast};
            }
          `;
        case "solid":
        default:
          return css`
            background-color: transparent;
            border: 1px solid ${theme.palette[color].color};
            color: ${theme.palette[color].color};

            i {
              color: ${theme.palette[color].color};
            }
          `;
      }
    }}
  }

  &:active,
  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
    background-color: whitesmoke;
    color: #5f5f5f;
    border-color: #bbb;
    cursor: auto;

    i {
      color: #5f5f5f;
    }
  }
`;

interface Props {
  children: string;
  fill?: ButtonFill;
  color?: Colors;
  shape?: ButtonShape;
  type?: ButtonType;
  icon?: string;
  iconType?: IconType;
  loading?: boolean;
  disabled?: boolean;
  clearOpacity?: number;
  style?: React.CSSProperties;
  effect?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  children,
  fill = "solid",
  color = "primary",
  shape = "semi-round",
  type = "button",
  style,
  icon,
  iconType = "solid",
  loading,
  clearOpacity = 0.1,
  effect = true,
  disabled,
  className,
  onClick,
}: Props) => {
  const element = useRef<HTMLButtonElement | null>(null);

  return (
    <StyledButton
      ref={element}
      type={type}
      fill={fill}
      color={color}
      shape={shape}
      clearOpacity={clearOpacity}
      disabled={disabled}
      style={style}
      effect={effect}
      className={className}
      width={element?.current?.clientWidth || 200}
      hasText={children?.length > 0}
      onClick={onClick}
    >
      {loading && (
        <Spinner size={16} color={color} style={{ marginRight: 8 }} />
      )}
      {icon && <Icon icon={icon} size={14} type={iconType} />}
      <ButtonText>{children}</ButtonText>
    </StyledButton>
  );
};

export default Button;
