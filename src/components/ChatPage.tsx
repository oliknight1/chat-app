import ChatBox from "./ChatBox";
import Sidebar from './Sidebar';
import ChatList from './ChatList';
import {Button, Flex, FormControl, FormErrorMessage, HStack, Input, useDisclosure} from "@chakra-ui/react";
import {fetchSignInMethodsForEmail} from "firebase/auth";
import {auth} from "../config/firebase";
import DialogBox from "./DialogBox";
import {FormEvent, useState} from "react";

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
				<ChatInviteForm error={ invite_error } set_error={ set_invite_error } />
			</DialogBox>
		</Flex>
	);
}

const ChatInviteForm = ( { error, set_error } : { error : string | null, set_error: React.Dispatch<React.SetStateAction<any>> } ) => {
	const [ invite_email, set_invite_email ] = useState<string>();
	const [ invite_loading, set_invite_loading ] = useState<boolean>( false );
	const handle_chat_invite = async ( e : FormEvent<HTMLFormElement> ) => {
		e.preventDefault();
		set_error( null );
		set_invite_loading( true )
		if( invite_email ) {
			const matched_emails = await fetchSignInMethodsForEmail( auth, invite_email )
			console.log( matched_emails )
			if( matched_emails.length ) {
				// Create chat
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
