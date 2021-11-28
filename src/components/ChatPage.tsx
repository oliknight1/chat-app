import ChatBox from "./ChatBox";
import Sidebar from './Sidebar';
import ChatList from './ChatList';
import {Button, Flex, FormControl, FormErrorMessage, HStack, Input, useDisclosure} from "@chakra-ui/react";
import {fetchSignInMethodsForEmail} from "firebase/auth";
import {auth, db} from "../config/firebase";
import DialogBox from "./DialogBox";
import {FormEvent, useState} from "react";
import {write_to_db} from "../services/database_helpers";
import { useAuth } from '../contexts/auth_context';
import {collection, getDocs, limit, query, where} from "firebase/firestore";

const ChatPage = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [ invite_error, set_invite_error ] = useState<string | null>( null );


	// Make sure to remove the error once the dialog is closed
	const dialog_close_handler = () => {
		set_invite_error( null )
		return onClose();
	}

	return (
		<Flex height='100vh'>
			<Sidebar dialog_hanlder={ onOpen } />
			<ChatList />
			<ChatBox />
			<DialogBox is_open={ isOpen } on_close={ dialog_close_handler } title='Start a chat with a user'>
				<ChatInviteForm error={ invite_error } set_error={ set_invite_error } on_close={ onClose } />
			</DialogBox>
		</Flex>
	);
}

const ChatInviteForm = ( { error, set_error, on_close } : { error : string | null, set_error: React.Dispatch<React.SetStateAction<any>>, on_close : () => void } ) => {

	const [ invite_email, set_invite_email ] = useState<string>( '' );
	const [ invite_loading, set_invite_loading ] = useState<boolean>( false );
	const { current_user } = useAuth();

	const handle_chat_invite = async ( e : FormEvent<HTMLFormElement> ) => {
		e.preventDefault();
		set_error( null );
		set_invite_loading( true );
		if( invite_email === current_user.email ) {
			set_error( 'Cannot invite yourself, sorry!' );
			set_invite_loading( false );
			return;
		}
		if( invite_email.length > 0 ) {
			const matched_emails = await fetchSignInMethodsForEmail( auth, invite_email )
			if( matched_emails.length ) {
				// Create chat
				const users_ref = collection( db, 'users' );
				const q = query( users_ref, where( 'email', '==', invite_email ), limit( 1 ) );
				const query_snapshot = await getDocs( q );

				if ( query_snapshot.docs.length === 0 ) {
					set_error( 'User not found' );
					set_invite_loading( false );
					return;
				}

				const invited_user_id = query_snapshot.docs[0].id

				const data = {
					members_uid : [ current_user.uid, invited_user_id ]
				};

				write_to_db( 'chatrooms', data );
				// Close dialog, open chat
				on_close()
			} else {
				set_error( 'User not found' )
			}
			set_invite_loading( false )
		}
	}

	const handle_invite_change = ( e : FormEvent<HTMLInputElement>) => {
		set_invite_email( e.currentTarget.value )
		// Remove error once user starts typing new email
		set_error( null );
	}
	return (
		<form onSubmit={ handle_chat_invite }>
			<FormControl isInvalid={ error !== null }>
				<FormErrorMessage mt={ 0 }>{ error }</FormErrorMessage>
				<HStack spacing={ 2 }>
					<Input type='email' placeholder="Enter user's email" onChange={ handle_invite_change } />
					<Button type='submit' backgroundColor='teal.dark' color='white' isLoading={ invite_loading }>Submit</Button>
				</HStack>
			</FormControl>
		</form>
	);
}
export default ChatPage;
