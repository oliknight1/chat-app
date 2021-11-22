import {Box, Input} from "@chakra-ui/react";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {ChangeEvent, useState} from "react";
import {db} from "../config/firebase";
import {useAuth} from "../contexts/auth_context";
import {Message} from "../utils/typings";
import ChatMessage from "./ChatMessage";

const ChatBox = () => {
	const [ messages, set_messages ] = useState<Message[]>([]);
	const [ new_message, set_new_message ] = useState<string>( '' );
	const { current_user } = useAuth();
	const { uid } = current_user;

	const post_message = async ( data : Message ) => {
    try {
		const docRef = await addDoc(collection(db, 'messages'), data );
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }

	}

	const message_form_handler = ( e : ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		if( new_message.length > 0 ) {
			const message: Message = {
				text: new_message.trim(),
				timestamp: serverTimestamp() ,
				uid,
			}
			set_messages( messages.concat( [message] ) );
			set_new_message( '' );
			post_message( message );
		}

	}
	const handle_new_message = ( e : ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		set_new_message( e.target.value );
	}
	return (
		<Box bg='red' w='lg'>
			<Box>
				{
					messages.map( message => {
						return (
							<ChatMessage message={ message.text } key={ message.timestamp }/>
						);
					} )
				}
			</Box>
			<form onSubmit={ message_form_handler }>
				<Input type='text' background='green' value={ new_message } onChange={ handle_new_message } />
			</form>
		</Box>
	);
}
export default ChatBox;
