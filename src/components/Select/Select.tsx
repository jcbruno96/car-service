import styled from "styled-components";

import { Colors } from "../../theme";
import HelperText from "../HelperText/HelperText";

const Fieldset = styled.fieldset`
  --typography-size: 15px;
  --base-ratio: 4.2px;
  padding: 0;
  margin: 0;
  border: none;
  margin-inline-start: 0;
  margin-inline-end: 0;
  padding-inline-start: 0;
  padding-inline-end: 0;
  padding-block-start: 0;
  padding-block-end: 0;
`;

const Legend = styled.legend`
  font-size: var(--typography-size);
  transform: translateY(calc(100% + 3 * var(--base-ratio) + 1px));
  background-color: transparent;
  color: rgba(0, 0, 0, 0.54);
  transition: all 0.2 ease;
`;

const Label = styled.label`
  cursor: text;
  font-size: var(--typography-size);
  transition: font-size 0.3s ease;
  background: transparent;
`;

const StyledSelect = styled.select<{ isError: boolean; color: Colors }>`
  width: 100%;
  height: 44px;
  border: none;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-color: ${({ isError, theme: { palette } }) =>
    isError ? palette.error.color : "rgba(0, 0, 0, 0.42)"};
  color: #2f2f2f;
  font-size: var(--typography-size);
  background-color: transparent;

  margin: 0;
  padding: 0;
  padding-top: calc(3 * var(--base-ratio));
  padding-bottom: calc(2 * var(--base-ratio));
  padding-left: 2px;
  outline: none;

  &::placeholder {
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:focus::placeholder {
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  /**
   * Cuando no se muestra el placeholder (input con texto) o
   * cuando el input tiene el focus, el Legend que le sigue,
   * se mueve hacia la parte superior y se achica la letra del label.
   */
  &:not(:placeholder-shown) ~ ${Legend}, &:focus ~ ${Legend} {
    transform: translateY(50%);
    transition: all 0.3 ease-in-out;

    ${Label} {
      font-size: 12px;
      transition: font-size 0.25s ease;
    }
  }

  /* Color del texto del legend con el input tiene el focus */
  &:focus ~ ${Legend} {
    color: ${({ theme: { palette }, color }) => palette[color].color};
  }

  /* Se cambia el color del borde inferior cuando se pasa el mouse sobre el input */
  &:hover {
    border-color: #5f5f5f;
  }

  /* Cambia el color y grosor del borde inferior del input cuando 
    esta activo o focus y NO esta deshabilitado.
  */
  &:focus:not(:disabled),
  &:active:not(:disabled) {
    border-color: ${({ theme: { palette }, color }) => palette[color].color};
    border-width: 2px;
  }

  &:disabled {
    border-bottom-style: dotted;
    border-color: rgba(0, 0, 0, 0.38);

    & ~ ${Legend}, ::placeholder {
      color: rgba(0, 0, 0, 0.38);
    }
  }
`;

interface Props {
  label?: string;
  placeholder?: string;
  name?: string;
  value?: string | number;
  data?: any[];
  color?: Colors;
  disabled?: boolean;
  checked?: boolean;
  helperText?: string;
  errorText?: string;
  isError?: boolean;
  style?: React.CSSProperties;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  onBlur?: React.FocusEventHandler<HTMLSelectElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLSelectElement>;
}

const Select = (props: Props) => {
  const {
    style,
    label,
    color = "primary",
    data = [],
    placeholder = "Select Option",
    helperText = "",
    errorText = "",
    isError = false,
    ...others
  } = props;

  return (
    <div style={{ width: "100%", ...style }}>
      <Fieldset>
        <StyledSelect
          isError={isError}
          color={color}
          autoComplete="off"
          {...others}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {data?.map((option) => (
            <option value={option.id} key={option.id}>
              {option.name}
            </option>
          ))}
        </StyledSelect>
        <Legend>
          <Label htmlFor={others.name}>{label}</Label>
        </Legend>
      </Fieldset>
      <HelperText isError={isError}>
        {isError ? errorText : helperText}
      </HelperText>
    </div>
  );
};

export default Select;
