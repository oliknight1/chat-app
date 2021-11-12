import { Box, Text, Flex, Button, Alert, Stack, AlertIcon } from "@chakra-ui/react";

export interface UserAuthFormProps {
	children: JSX.Element[],
	title : string,
	button_text: string,
	handle_submit: React.Dispatch<React.SetStateAction<any>>,
	error: string | null,
	loading: boolean

}

const UserAuthForm = ( { children, title, button_text, handle_submit, error, loading } : UserAuthFormProps ) => {
	return (
		<Box bg='white' w={ ['xxsm', 'lg'] } margin='0 auto' boxShadow='2xl' p={ 10 } rounded='2xl'>
			<form onSubmit={ handle_submit }>
				{
					error !== null &&
					<Stack spacing={ 3 } mb={ 5 }>
						<Alert status='error' variant='subtle'>
							<AlertIcon />
							{ error }
						</Alert>
					</Stack>
				}
				<Flex width={ ['100%', '80%'] }  flexDir='column' justifyContent='space-between' alignItems='center' margin='0 auto'>
					<Text fontSize='2xl' fontWeight='medium' mb={ 5 }>{ title }</Text>
					{ children }
					<Button type='submit' isLoading={ loading } mt={ 3 }>
						{ button_text }
					</Button>
				</Flex>
			</form>
		</Box>
	);
};
export default UserAuthForm;
