import { Box, Text, Flex, Button, Alert, Stack, AlertIcon } from "@chakra-ui/react";

export interface UserAuthFormProps {
	children: JSX.Element[] 
	title : string,
	button_text: string,
	handle_submit: React.Dispatch<React.SetStateAction<any>>,
	error: string | null
}

const UserAuthForm = ( { children, title, button_text, handle_submit, error } : UserAuthFormProps ) => {
	return (
		<Box bg='white' w='lg' margin='0 auto' boxShadow='2xl' p={ 10 } rounded='2xl'>
			{ 
				error !== null && 
				<Stack spacing={ 3 } mb={ 5 }>
					<Alert status='error' variant='subtle'>
						<AlertIcon />
						{ error }
					</Alert>
				</Stack>
			}
			<Flex width='80%' flexDir='column' justifyContent='space-between' alignItems='center' margin='0 auto'>
				<Text fontSize='3xl' fontWeight='medium' mb={ 5 }>{ title }</Text>
				{ children }
				<Button onClick={ handle_submit }>
					{ button_text }
				</Button>
			</Flex>
		</Box>
	);
};
export default UserAuthForm;
