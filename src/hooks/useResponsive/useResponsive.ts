import { useState, useEffect } from "react";

export const useResponsive = (breakpoint = 768) => {
  const { innerWidth } = window;

  const [isMobile, setIsMobile] = useState(false);
  const [width, setWidth] = useState(innerWidth);

  const reportWindowSize = (e: any) => {
    const actualWidth = e.target.innerWidth;
    if (actualWidth < breakpoint && !isMobile) setIsMobile(true);
    if (actualWidth >= breakpoint) setIsMobile(false);
  };

  useEffect(() => {
    setWidth(innerWidth);
    if (innerWidth < breakpoint) setIsMobile(true);
    else setIsMobile(false);

    window.addEventListener("resize", reportWindowSize);
    return () => window.removeEventListener("resize", reportWindowSize);
  });

  return {
    width,
    isMobile,
  };
};
