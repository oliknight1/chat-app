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
					const { color, thickness, emptyColor, transition } = props
					return {
						color,
						borderWidth: thickness,
						borderBottomColor: emptyColor,
						borderLeftColor: emptyColor,
						transition

					}
				},
				defaultProps: {
					size: 'xl',
					thickness: '4px',
					color: 'teal.dark',
					emptyColor: 'gray.300',
					transition: 'all ease 4s'
				}
			}
		}
	},
);

ReactDOM.render(
	<ChakraProvider theme={ theme }>
		<App />
	</ChakraProvider>,
	document.getElementById('root')
);

