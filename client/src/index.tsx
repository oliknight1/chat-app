import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { extendTheme } from "@chakra-ui/react"

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

const theme = extendTheme({ config })
console.log( theme.config.initialColorMode )

ReactDOM.render(
	<ChakraProvider theme={ theme }>
		<React.StrictMode>
			<ColorModeScript initialColorMode={theme.config.initialColorMode} />
			<App />
		</React.StrictMode>
	</ChakraProvider>,
	document.getElementById('root')
);

