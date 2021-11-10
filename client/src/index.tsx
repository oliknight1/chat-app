import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import ForceLightMode from './components/ForceLightMode';


ReactDOM.render(
	<ChakraProvider>
		<ForceLightMode>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</ForceLightMode>
	</ChakraProvider>,
	document.getElementById('root')
);

