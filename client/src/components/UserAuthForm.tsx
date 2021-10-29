import { Box, Text, Flex, Input, InputGroup, InputLeftElement, Button, FormControl, FormLabel } from "@chakra-ui/react";
import { EmailIcon, InfoIcon, LockIcon } from '@chakra-ui/icons';
import { UserAuthFormProps } from '../utils/typings';

const UserAuthForm = ( { title } : UserAuthFormProps ) => {

	return (
		<Box bg='white' w='lg' margin='0 auto' boxShadow='2xl' p={ 10 } rounded='2xl'>
			<form action='/api/user/register' method='post'>
				<Flex height='sm' width='80%' flexDir='column' justifyContent='space-between' alignItems='center' margin='0 auto'>
					<Text fontSize='3xl' fontWeight='medium' mb={ 5 }>{ title }</Text>
					<FormControl id='username' isRequired>
						<FormLabel>
							Username
						</FormLabel>
						<InputGroup>
							<InputLeftElement
								top='10%'
								pointerEvents='none'
								children={ <InfoIcon textAlign='center' color='gray.300'/> }
							/>
							<Input variant='outline' size='lg' placeholder='Enter a username' />
						</InputGroup>
					</FormControl>
					<FormControl id='email' isRequired>
						<FormLabel>
							Email
						</FormLabel>
						<InputGroup>
							<InputLeftElement
								top='10%'
								pointerEvents='none'
								children={ <EmailIcon color='gray.300'/> }
							/>
							<Input variant='outline' type='email' size='lg' placeholder='Enter an email address' />
						</InputGroup>
					</FormControl>
					<FormControl id='password' isRequired>
						<FormLabel>
							Password
						</FormLabel>
						<InputGroup>
							<InputLeftElement
								top='10%'
								pointerEvents='none'
								children={ <LockIcon color='gray.300'/> }
							/>
							<Input type='password' variant='outline' size='lg' placeholder='Enter a password' />
						</InputGroup>
					</FormControl>
					<Button mt={ 8 } type='submit'>
						Register
					</Button>
				</Flex>
			</form>
		</Box>
	);
};
export default UserAuthForm;
