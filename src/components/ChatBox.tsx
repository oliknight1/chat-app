import {Box, Button, Container, Flex, Input, InputGroup, InputRightElement} from "@chakra-ui/react";
import {addDoc, collection,  limit, orderBy, query, serverTimestamp} from "firebase/firestore";
import {ChangeEvent,   useState} from "react";
import {db} from "../config/firebase";
import {useAuth} from "../contexts/auth_context";
import {Message} from "../utils/typings";
import ChatMessage from "./ChatMessage";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import SendIcon from "./SendIcon";


const ChatBox = () => {
	// Input state
	const [ new_message, set_new_message ] = useState<string>( '' );

	const [ message_post_error, set_message_post_error ] = useState<string | null>( null )

	const { current_user } = useAuth();
	const { uid } = current_user;

	// Handle getting data
	const messages_ref = collection( db, 'messages' )
	const q = query( messages_ref, orderBy( 'timestamp' ), limit( 25 ) )
	const [ messages,loading ] = useCollectionData (q, { idField: 'id' } );

	const post_message = async ( data : Message ) => {
		try {
			await addDoc(collection(db, 'messages'), data );
		} catch ( error ) {
			set_message_post_error( error as string );
		}
	}

	const message_form_handler = ( e : ChangeEvent<HTMLFormElement> ) => {
		e.preventDefault();
		if( new_message.length > 0 ) {
			const message: Message = {
				text: new_message.trim(),
				timestamp: serverTimestamp() ,
				uid,
			}
			post_message( message );
			set_new_message( '' );
		}

	}

	const handle_new_message = ( e : ChangeEvent<HTMLInputElement> ) => {
		e.preventDefault();
		set_new_message( e.target.value );
	}

	return (
		<Container maxW='80%' h='100%'>
			<Box>
				{
					loading === true &&
					<p>LOADING</p>
				}
				{ messages &&
					messages.map( message => {
						return (
							<ChatMessage message={ message.text } key={ message.timestamp }/>
						);
					} )
				}
			</Box>
			<form onSubmit={ message_form_handler }>
				<Flex>
					<InputGroup>
						<Input type='text' variant='filled' py={6} value={ new_message } onChange={ handle_new_message } placeholder='Enter a message' mr={ 3 }/>
						<InputRightElement right='5%' top='10%' children={ <SendIcon width='20px' height='20px' /> } />
					</InputGroup>
				</Flex>
			</form>
		</Container>
	);
}
export default ChatBox;
