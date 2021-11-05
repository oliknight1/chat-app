import { EmailIcon, InfoIcon, LockIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";
import BackgroundImage from "./BackgroundImage"
import TextInput from "./TextInput";
import UserAuthForm from "./UserAuthForm"
import { useAuth } from '../contexts/auth_context';
import { useState } from "react";
import firebase from 'firebase/app';

const Register = () => {
	const [ username, set_username] = useState<string>( '' );
	const [ email, set_email ] = useState<string>( '' );
	const [ password, set_password ] = useState<string>( '' );
	const [ password_confirm, set_password_confirm ] = useState<string>( '' );
	const [ error, set_error ] = useState<string | null>( null );
	const { signup } = useAuth();

	const handle_submit = async ( e : Event ) => {
		if( username === '' || email === '' || password === '' || password_confirm === '' ) {
			set_error( 'Please fill out all required fields' );
			return;

		}
		if ( password_confirm !== password ) {
			set_error( 'Passwords did not match' );
			return;
		}
		try {
			await signup( email, password );
		} catch( e ) {
			const code = ( e as firebase.FirebaseError ).code;
			console.log( code )
			set_error( 'There was an error creating the account' );
		}
	}
	return (
		<>
			<Flex alignItems='center' height='100vh' background='transparent'>
				<UserAuthForm title='Create an account' button_text='Register' handle_submit={ handle_submit } error={ error }>
					<TextInput id='username' label='Username' type='text' state={ username } set_state={ set_username } icon={ <InfoIcon textAlign='center' color='gray.300'/>  } />
					<TextInput id='email' label='Email' type='email' state={ email } set_state={ set_email } icon={ <EmailIcon textAlign='center' color='gray.300'/>  } />
					<TextInput id='password' label='Password' type='password' state={ password } set_state={ set_password } icon={ <LockIcon textAlign='center' color='gray.300'/>  } />
					<TextInput id='password_confirm' label='Confirm Password' type='password' state={ password_confirm } set_state={ set_password_confirm } icon={ <LockIcon textAlign='center' color='gray.300'/>  } />
				</UserAuthForm>
			</Flex>
			<BackgroundImage />
		</>
	);
}
export default Register;
