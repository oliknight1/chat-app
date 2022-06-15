import { Box, Text, Flex, Button, Alert, Stack, AlertIcon, Link } from "@chakra-ui/react";
import {useRouter} from "next/router";

export interface UserAuthFormProps {
	children: JSX.Element[],
	title : string,
	button_text: string,
	handle_submit: React.Dispatch<React.SetStateAction<any>>,
	error: string | null,
	loading: boolean

}

const UserAuthForm = ( { children, title, button_text, handle_submit, error, loading } : UserAuthFormProps ) => {
	let link_element;
	const router = useRouter();
	if( router.pathname === '/login' ) {
		link_element = <Text>Don&#39;t have an account? Create one <Link href='/register' color='teal.dark'>here!</Link></Text>
	} else {
		link_element = <Text>Already have an account? Sign in <Link href='/login' color='teal.dark'>here!</Link></Text>
	}
	return (
		<Box bg='white' w={ ['sm', 'lg'] } margin='0 auto' boxShadow='2xl' p={ 10 } rounded='2xl' position='relative'>
			<form onSubmit={ handle_submit }>
				{
					error !== null &&
					<Stack spacing={ 3 } mb={ 5 } width='90%' margin='16px auto'>
						<Alert status='error' variant='subtle' position={ ['absolute', 'relative'] } rounded='xl' left={ 0 } top={ 0 }>
							<AlertIcon />
							{ error }
						</Alert>
					</Stack>
				}
				<Flex width={ ['100%', '80%'] }  flexDir='column' justifyContent='space-between' alignItems='center' margin='0 auto'>
					<Text fontSize={ [ '2xl', '4xl' ] } mb={ 5 }>{ title }</Text>
					{ children }
					<Button type='submit'_hover={{ backgroundColour: 'teal' }} isLoading={ loading } mt={ 3 } background='teal.dark' color='white' width='100%' fontSize={ 18 }>
						{ button_text }
					</Button>
					<Box mt={ 5 }>
						{ link_element }
					</Box>
				</Flex>
			</form>
		</Box>
	);
};
export default UserAuthForm;
