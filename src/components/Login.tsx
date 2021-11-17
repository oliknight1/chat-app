import {EmailIcon, LockIcon} from "@chakra-ui/icons";
import {Flex} from "@chakra-ui/react";
import { useState } from "react";
import {useAuth} from "../contexts/auth_context";
import BackgroundImage from "./BackgroundImage";
import TextInput from "./TextInput";
import UserAuthForm from "./UserAuthForm";
import firebase from 'firebase/app';
import {handle_auth_code} from "../services/user_auth_validation";
import {useHistory} from "react-router-dom";

const Login = () => {
	const [ email, set_email ] = useState<string>( '' );
	const [ password, set_password ] = useState<string>( '' );
	const [ error, set_error ] = useState<string | null>( null );
	const [ loading, set_loading ] = useState<boolean>( false );
	const { login } = useAuth();
	const history = useHistory();

	// TODO: add hsitory link to home page onsubmit

	const handle_submit =  async ( e : Event ) => {
		e.preventDefault();
		set_error( null );

		if( email === '' || password === '' ) {
			set_error( 'Please fill out all required fields' );
			return;
		}
		try {
			set_loading( true );
			await login( email, password );
			history.push( '/' );
		} catch ( e ) {
			const code = ( e as firebase.FirebaseError ).code
			set_error( handle_auth_code( code ) )
		}
		set_loading( false );

	}

	return (
		<>
			<Flex alignItems='center' height='90vh' background='transparent'>
				<UserAuthForm title='Login to your account' button_text='Login' handle_submit={ handle_submit } error={ error } loading={ loading }>
					<TextInput
						id='email'
						label='Email'
						type='email'
						state={ email }
						set_state={ set_email }
						icon={ <EmailIcon textAlign='center' color='gray.300'/> }
						placeholder='Please enter an email'
					/>
					<TextInput
						id='password'
						label='Password'
						type='password'
						state={ password }
						set_state={ set_password }
						icon={ <LockIcon textAlign='center' color='gray.300'/> }
						placeholder='Please enter a password'
					/>
				</UserAuthForm>
			</Flex>
			<BackgroundImage />
		</>
	)
};

export default Login;
