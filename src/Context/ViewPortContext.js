// this context to detect screen size to show specific components based on screen size

import { createContext, useContext, useEffect, useState } from "react";

const Viewportcontext = createContext({
  isMobile: window.innerWidth < 769,
});

export const ViewportProvider = ({ children }) => {
  const [isMobile, setMobile] = useState(window.innerWidth < 769);
  //handle resize event
  useEffect(() => {
    window.addEventListener("resize", () => setMobile(window.outerWidth < 769));
    return window.removeEventListener("resize", () =>
      setMobile(window.outerWidth < 769)
    );
  }, []);
  return (
    <Viewportcontext.Provider value={{ isMobile }}>
      {children}
    </Viewportcontext.Provider>
  );
};

export function useViewport() {
  return useContext(Viewportcontext);
}
