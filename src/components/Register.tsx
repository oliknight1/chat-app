import { EmailIcon, InfoIcon, LockIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";
import BackgroundImage from "./BackgroundImage"
import UserAuthTextInput from "./UserAuthTextInput";
import UserAuthForm from "./UserAuthForm"
import { useAuth } from '../contexts/auth_context';
import { useState } from "react";
import firebase from 'firebase/app';
import {handle_auth_code} from "../services/user_auth_validation";
import {updateProfile} from "firebase/auth";
import {useHistory} from "react-router-dom";
import {doc, setDoc} from "firebase/firestore";
import {db} from "../config/firebase";

const Register = () => {
	const [ username, set_username] = useState<string>( '' );
	const [ email, set_email ] = useState<string>( '' );
	const [ password, set_password ] = useState<string>( '' );
	const [ password_confirm, set_password_confirm ] = useState<string>( '' );
	const [ error, set_error ] = useState<string | null>( null );
	const [ loading, set_loading ] = useState<boolean>( false );
	const { signup } = useAuth();
	const history = useHistory();

	const handle_submit = async ( e : Event ) => {
		e.preventDefault();
		set_error( null );
		if( username === '' || email === '' || password === '' || password_confirm === '' ) {
			set_error( 'Please fill out all required fields' );
			return;

		}
		if ( password_confirm !== password ) {
			set_error( 'Passwords did not match' );
			return;
		}
		try {
			set_loading( true )
			await signup( email.trim(), password.trim() ).then( async ( user_credential : any ) => {
				await setDoc( doc( db, 'users', user_credential.user.uid ), { email : user_credential.user.email } )
				updateProfile( user_credential.user, {
					displayName: username.trim(),
					photoURL: 'https://firebasestorage.googleapis.com/v0/b/picchat-6f594.appspot.com/o/default_user.png?alt=media&token=bb8c6886-db7e-4d67-8a9d-8e227859bd80'
				} )
			} );
			history.push( '/' )
		} catch( e ) {
			const code = ( e as firebase.FirebaseError ).code;
			set_error( handle_auth_code( code ) )
		}
		set_loading( false );
	}
	return (
		<>
			<Flex alignItems='center' height='90vh' background='transparent'>
				<UserAuthForm title='Create an account' button_text='Register' handle_submit={ handle_submit } error={ error } loading={ loading }>
					<UserAuthTextInput
						id='username'
						label='Username'
						type='text'
						state={ username }
						set_state={ set_username }
						icon={ <InfoIcon textAlign='center' color='gray.300'/> }
						placeholder='Please enter a username'
					/>
					<UserAuthTextInput
						id='email'
						label='Email'
						type='email'
						state={ email }
						set_state={ set_email }
						icon={ <EmailIcon textAlign='center' color='gray.300'/> }
						placeholder='Please enter an email'
					/>
					<UserAuthTextInput
						id='password'
						label='Password'
						type='password'
						state={ password }
						set_state={ set_password }
						icon={ <LockIcon textAlign='center' color='gray.300'/> }
						placeholder='Please enter a password'
					/>
					<UserAuthTextInput
						id='password_confirm'
						label='Confirm Password'
						type='password'
						state={ password_confirm }
						set_state={ set_password_confirm }
						icon={ <LockIcon textAlign='center' color='gray.300'/> }
						placeholder='Please confirm your password'
					/>
				</UserAuthForm>
			</Flex>
			<BackgroundImage />
		</>
	);
}
export default Register;
