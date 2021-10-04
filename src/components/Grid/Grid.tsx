import React from "react";
import styled, { css } from "styled-components";

const ColWrapper = styled.div<{
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xsOffset?: number;
  smOffset?: number;
  mdOffset?: number;
  lgOffset?: number;
  xlOffset?: number;
  className?: string;
}>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px;

  ${({
    theme,
    xs,
    sm,
    md,
    lg,
    xl,
    xsOffset,
    smOffset,
    mdOffset,
    lgOffset,
    xlOffset,
  }) => css`
    width: ${((xl || lg || md || sm || xs || 12) / 12) * 100 + "%"};
    margin-left: ${((xlOffset || 0) / 12) * 100 + "%"};

    @media (max-width: ${theme.breakpoints.lg}px) {
      width: ${((lg || md || sm || xs || 12) / 12) * 100 + "%"};
      margin-left: ${((lgOffset || 0) / 12) * 100 + "%"};
    }

    @media (max-width: ${theme.breakpoints.md}px) {
      width: ${((md || sm || xs || 12) / 12) * 100 + "%"};
      margin-left: ${((mdOffset || 0) / 12) * 100 + "%"};
    }

    @media (max-width: ${theme.breakpoints.sm}px) {
      width: ${((sm || xs || 12) / 12) * 100 + "%"};
      margin-left: ${((smOffset || 0) / 12) * 100 + "%"};
    }

    @media (max-width: ${theme.breakpoints.xs}px) {
      width: ${((xs || 12) / 12) * 100 + "%"};
      margin-left: ${((xsOffset || 0) / 12) * 100 + "%"};
    }
  `}
`;

interface ColProps {
  children: JSX.Element | JSX.Element[];
  style?: React.CSSProperties;
  className?: string;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xsOffset?: number;
  smOffset?: number;
  mdOffset?: number;
  lgOffset?: number;
  xlOffset?: number;
}

export const Col = (props: ColProps) => {
  const { children, className, ...rest } = props;
  return (
    <ColWrapper className={className} {...rest}>
      {children}
    </ColWrapper>
  );
};

const RowWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 0;
  width: 100%;
`;

interface RowProps {
  children: JSX.Element | JSX.Element[];
  style?: React.CSSProperties;
  className?: string;
}

export const Row = ({ children, style, className }: RowProps) => {
  return (
    <RowWrapper style={style} className={className}>
      {React.Children.toArray(children).map((item: any, index) => {
        return (
          item && (
            <Col key={item?.id || index} {...item?.props}>
              {item?.props?.children}
            </Col>
          )
        );
      })}
    </RowWrapper>
  );
};

export const Grid = styled.div`
  width: 100%;
`;
