import {Box, Input} from "@chakra-ui/react";
import {ChangeEvent, useState} from "react";
import {useAuth} from "../contexts/auth_context";
import {Message} from "../utils/typings";
import ChatMessage from "./ChatMessage";

const ChatBox = () => {
	const [ messages, set_messages ] = useState<Message[]>([]);
	const [ new_message, set_new_message ] = useState<string>( '' );
	const { current_user } = useAuth();
	const { uid } = current_user;
	
	
	const post_message = ( e : ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		if( new_message.length > 0 ) {
			const message: Message = {
				text: new_message.trim(),
				// REPLACE WITH TIMESTAMP FROM FIREBASE
				timestamp: Date.now() ,
				uid,
			}
			set_messages( messages.concat( [message] ) );
			set_new_message( '' )
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
			<form onSubmit={ post_message }>
				<Input type='text' background='green' value={ new_message } onChange={ handle_new_message } />
			</form>
		</Box>
	);
}
export default ChatBox;
