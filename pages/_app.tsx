import {ChakraProvider, extendTheme, SpinnerProps} from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import AuthProvider from '../contexts/auth_context';

function MyApp({ Component, pageProps }: AppProps) {
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
	return (
		<ChakraProvider theme={theme}>
			<Head>
				<title>Chat App</title>
			</Head>
			<AuthProvider>
				<Component {...pageProps} />
			</AuthProvider>
		</ChakraProvider>
	)
}

export default MyApp
