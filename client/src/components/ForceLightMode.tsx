// Temporary component, remove when new Chakra UI version is released

import {useColorMode} from "@chakra-ui/react";
import {useEffect} from "react";

const ForceLightMode = ( props: { children: JSX.Element } ) => {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if ( colorMode === "light" ) return;
    toggleColorMode();
  }, [ colorMode, toggleColorMode ]);

  return props.children;
}
export default ForceLightMode;
