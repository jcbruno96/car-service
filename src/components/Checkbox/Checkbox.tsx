import React from "react";
import styled from "styled-components";

interface Props {
  checked?: boolean;
  label: string;
  className?: string;
  style?: React.CSSProperties;
  onChange: () => void;
}

const Checkbox = ({ className, checked, style, label, ...props }: Props) => (
  <Label style={style}>
    <CheckboxContainer className={className}>
      <HiddenCheckbox checked={checked || false} {...props} />
      <StyledCheckbox checked={checked || false}>
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
    <Span>{label}</Span>
  </Label>
);

export default Checkbox;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  // Hide checkbox visually but remain accessible to screen readers.
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div<{ checked?: boolean }>`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 1px solid
    ${({ theme, checked }) =>
      checked ? theme.palette.primary.color : theme.palette.medium.color};
  background: ${({ checked, theme }) =>
    checked ? theme.palette.primary.color : "#fff"};
  border-radius: 3px;
  transition: all 150ms;

  ${Icon} {
    visibility: ${({ checked }) => (checked ? "visible" : "hidden")};
  }
`;

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Span = styled.span`
  font-size: 15px;
`;
