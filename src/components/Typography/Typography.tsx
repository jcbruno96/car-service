import React from "react";
import styled from "styled-components";
import { Colors } from "../../theme";

export type Variant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "label"
  | "a";

type FontWeight =
  | "default"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "bold"
  | "bolder"
  | "lighter"
  | "normal";

const H1 = styled.h1<{ color: Colors; fontWeight: FontWeight }>`
  color: ${({ theme: { palette }, color }) => palette[color].color};
  font-size: ${({ theme }) => theme.typography.h1}px;
  font-weight: ${({ fontWeight }) =>
    fontWeight === "default" ? "800" : fontWeight};
`;

const H2 = styled.h2<{ color: Colors; fontWeight: FontWeight }>`
  color: ${({ theme: { palette }, color }) => palette[color].color};
  font-size: ${({ theme }) => theme.typography.h2}px;
  font-weight: ${({ fontWeight }) =>
    fontWeight === "default" ? "700" : fontWeight};
`;
const H3 = styled.h3<{ color: Colors; fontWeight: FontWeight }>`
  color: ${({ theme: { palette }, color }) => palette[color].color};
  font-size: ${({ theme }) => theme.typography.h3}px;
  font-weight: ${({ fontWeight }) =>
    fontWeight === "default" ? "600" : fontWeight};
`;
const H4 = styled.h4<{ color: Colors; fontWeight: FontWeight }>`
  color: ${({ theme: { palette }, color }) => palette[color].color};
  font-size: ${({ theme }) => theme.typography.h4}px;
  font-weight: ${({ fontWeight }) =>
    fontWeight === "default" ? "600" : fontWeight};
`;
const H5 = styled.h5<{ color: Colors; fontWeight: FontWeight }>`
  color: ${({ theme: { palette }, color }) => palette[color].color};
  font-size: ${({ theme }) => theme.typography.h5}px;
  font-weight: ${({ fontWeight }) =>
    fontWeight === "default" ? "500" : fontWeight};
`;
const H6 = styled.h6<{ color: Colors; fontWeight: FontWeight }>`
  color: ${({ theme: { palette }, color }) => palette[color].color};
  font-size: ${({ theme }) => theme.typography.h6}px;
  font-weight: ${({ fontWeight }) =>
    fontWeight === "default" ? "500" : fontWeight};
`;
const P = styled.p<{ color: Colors; fontWeight: FontWeight }>`
  color: ${({ theme: { palette }, color }) => palette[color].color};
  font-size: ${({ theme }) => theme.typography.p}px;
  font-weight: ${({ fontWeight }) =>
    fontWeight === "default" ? "400" : fontWeight};
`;
const Label = styled.label<{ color: Colors; fontWeight: FontWeight }>`
  color: ${({ theme: { palette }, color }) => palette[color].color};
  font-size: ${({ theme }) => theme.typography.p}px;
  font-weight: ${({ fontWeight }) =>
    fontWeight === "default" ? "600" : fontWeight};
`;
const A = styled.a<{ color: Colors; fontWeight: FontWeight }>`
  color: ${({ theme: { palette }, color }) => palette[color].color};
  font-size: ${({ theme }) => theme.typography.p}px;
  font-weight: ${({ fontWeight }) =>
    fontWeight === "default" ? "400" : fontWeight};
`;

interface Props {
  variant: Variant;
  children: JSX.Element | JSX.Element[] | string | number;
  color?: Colors;
  fontWeight?: FontWeight;
  className?: string;
  style?: React.CSSProperties;
}
const Typography = ({
  variant,
  children,
  color = "dark",
  fontWeight = "default",
  className,
  style,
}: Props) => {
  switch (variant) {
    case "h1":
      return (
        <H1
          color={color}
          fontWeight={fontWeight}
          style={style}
          className={className}
        >
          {children}
        </H1>
      );
    case "h2":
      return (
        <H2
          color={color}
          fontWeight={fontWeight}
          style={style}
          className={className}
        >
          {children}
        </H2>
      );
    case "h3":
      return (
        <H3
          color={color}
          fontWeight={fontWeight}
          style={style}
          className={className}
        >
          {children}
        </H3>
      );
    case "h4":
      return (
        <H4
          color={color}
          fontWeight={fontWeight}
          style={style}
          className={className}
        >
          {children}
        </H4>
      );
    case "h5":
      return (
        <H5
          color={color}
          fontWeight={fontWeight}
          style={style}
          className={className}
        >
          {children}
        </H5>
      );
    case "h6":
      return (
        <H6
          color={color}
          fontWeight={fontWeight}
          style={style}
          className={className}
        >
          {children}
        </H6>
      );
    case "a":
      return (
        <A
          color={color}
          fontWeight={fontWeight}
          style={style}
          className={className}
        >
          {children}
        </A>
      );
    case "label":
      return (
        <Label
          color={color}
          fontWeight={fontWeight}
          style={style}
          className={className}
        >
          {children}
        </Label>
      );
    case "p":
    default:
      return (
        <P
          color={color}
          fontWeight={fontWeight}
          style={style}
          className={className}
        >
          {children}
        </P>
      );
  }
};

export default Typography;
