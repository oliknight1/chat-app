import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider, extendTheme, SpinnerProps } from '@chakra-ui/react';


const theme = extendTheme(
	{
		colors: {
			teal: {
				dark: '#38B2AC'
			}
		},
		components:{
			Spinner: {
				baseStyle: ( props: SpinnerProps ) => {
					const { color, thickness, emptyColor } = props
					return {
						color,
						borderWidth: thickness,
						borderBottomColor: emptyColor,
						borderLeftColor: emptyColor
					}
				},
				defaultProps: {
					size: 'xl',
					thickness: '4px',
					color: 'teal.dark',
					emptyColor: 'gray.300'
				}
			}
		}
	},
);

ReactDOM.render(
	<ChakraProvider theme={ theme }>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</ChakraProvider>,
	document.getElementById('root')
);

