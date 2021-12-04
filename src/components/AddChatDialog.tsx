import { Button, FormControl, FormErrorMessage, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import {fetchSignInMethodsForEmail} from "firebase/auth";
import {addDoc, collection, getDocs, limit, query, serverTimestamp, where} from "firebase/firestore";
import {FormEvent, RefObject, useRef, useState} from "react";
import {auth, db} from "../config/firebase";
import {useAuth} from "../contexts/auth_context";
import {Chatroom} from "../utils/typings";

interface AddChatDialogProps {
	is_open : boolean,
	on_close : () => void,
	title : string,
	error_message : string | null,
	set_error_message : React.Dispatch<React.SetStateAction<any>>,
	set_chatroom_uid : React.Dispatch<React.SetStateAction<any>>,
}
const AddChatDialog = ( { is_open, on_close, title, error_message, set_error_message, set_chatroom_uid } : AddChatDialogProps ) => {
	const initial_ref = useRef( null );
	return (
		<>
			<Modal isOpen={ is_open } onClose={ on_close } motionPreset='slideInBottom' isCentered initialFocusRef={ initial_ref }>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{ title }</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={ 10 }>
						<ChatInviteForm error={ error_message } set_error={ set_error_message } on_close={ on_close } initial_ref={ initial_ref } set_chatroom_uid={ set_chatroom_uid } /> 
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
interface ChatInviteFormProps {
	error : string | null,
	set_error : React.Dispatch<React.SetStateAction<any>>,
	on_close : () => void,
	initial_ref :RefObject<HTMLInputElement>,
	set_chatroom_uid: React.Dispatch<React.SetStateAction<any>>
}



const ChatInviteForm = ( { error, set_error, on_close, initial_ref, set_chatroom_uid } : ChatInviteFormProps ) => {

	const [ invite_email, set_invite_email ] = useState<string>( '' );
	const [ invite_loading, set_invite_loading ] = useState<boolean>( false );
	const { current_user } = useAuth();
	const { email, uid } = current_user;

	const handle_chat_invite = async ( e : FormEvent<HTMLFormElement> ) => {
		e.preventDefault();
		set_error( null );
		set_invite_loading( true );
		if( invite_email === email ) {
			set_error( 'Cannot invite yourself, sorry!' );
			set_invite_loading( false );
			return;
		}
		if( invite_email.length > 0 ) {
			// Doesnt't return user data, only returns what methods they can sign in with
			// If it returns nothing then no user was found
			const matched_emails = await fetchSignInMethodsForEmail( auth, invite_email )
			if( matched_emails.length ) {
				// Create chat
				const users_ref = collection( db, 'users' );
				const users_q = query( users_ref, where( 'email', '==', invite_email ), limit( 1 ) );
				const users_snapshot = await getDocs( users_q );
				const invited_user_id = users_snapshot.docs[0].id

				if ( users_snapshot.docs.length === 0 ) {
					set_error( 'User not found' );
					set_invite_loading( false );
					return;
				}

				const chatrooms_ref = collection( db, 'chatrooms' );
				const chatroom_q = query( chatrooms_ref, where( 'members_uid', 'in', [[uid, invited_user_id]]) )
				const chatroom_snapshot = await getDocs( chatroom_q );

				console.log( chatroom_snapshot.docs )

				console.log( chatroom_snapshot.docs.length )
				if( chatroom_snapshot.docs.length > 0 ) {
					set_error( 'Chat with user already exists' );
					set_invite_loading( false );
					return;
				}

				const data : Chatroom = {
					members_uid : [ uid, invited_user_id ],
					last_msg_at: serverTimestamp()
				};

				const new_doc_ref = await addDoc( collection( db, 'chatrooms' ), data );

				// Close dialog, open chat
				on_close();
				set_chatroom_uid( new_doc_ref.id )

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
					<Input type='email' placeholder="Enter user's email" onChange={ handle_invite_change } ref={ initial_ref } />
					<Button type='submit' backgroundColor='teal.dark' color='white' isLoading={ invite_loading }>Submit</Button>
				</HStack>
			</FormControl>
		</form>
	);
}

export default AddChatDialog;
