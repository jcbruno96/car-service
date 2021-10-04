import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

const Container = styled.div<{ timeout: number }>`
  overflow: hidden;
  transition: height ${({ timeout }) => timeout || 500}ms ease-in-out;
`;

interface Props {
  isOpen: boolean;
  timeout?: number;
  children: JSX.Element | JSX.Element[];
  fixedHeight?: number;
}

const Collapse = ({ isOpen, children, fixedHeight, timeout = 500 }: Props) => {
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let resizeObserver: ResizeObserver | null = null;

    if (!height || !isOpen || !ref.current) return undefined;
    if (fixedHeight) setHeight(fixedHeight);
    else {
      resizeObserver = new ResizeObserver((el) =>
        setHeight(el[0].contentRect.height)
      );
      resizeObserver.observe(ref.current);
    }

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [height, isOpen]);

  useEffect(() => {
    if (isOpen && ref?.current) {
      if (fixedHeight) setHeight(fixedHeight);
      else setHeight(ref.current?.getBoundingClientRect().height);
    } else setHeight(0);
  }, [isOpen]);

  return (
    <Container timeout={timeout} style={{ height }}>
      <div ref={ref}>
        <div>{children}</div>
      </div>
    </Container>
  );
};

export default Collapse;
