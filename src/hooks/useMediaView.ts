import { useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function useMediaView(viewPort?: number) {
  const [pcView] = useMediaQuery("(min-width: 1200px)");
  const [tableView] = useMediaQuery("(min-width: 801px)");
  const [mobileView] = useMediaQuery("(max-width: 800px)");
  const [bp750px] = useMediaQuery("(max-width: 750px)");
  const [bp500px] = useMediaQuery("(max-width: 500px)");
  const [bp1024px] = useMediaQuery("(max-width: 1023px)");

  const [customMaxView] = useMediaQuery(`"(max-width: ${viewPort}px)"`);
  return {
    pcView,
    tableView,
    mobileView,
    bp750px,
    bp500px,
    bp1024px,
    customMaxView,
  };
}

export function useWindowDimension() {
  const [width, setWidth] = useState(0);
  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return { width };
}

export default useMediaView;
