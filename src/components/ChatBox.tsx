import {Container, Flex, Input, InputGroup, InputRightElement} from "@chakra-ui/react";
import { collectionGroup, doc,  orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
import {ChangeEvent,   useState} from "react";
import {db} from "../config/firebase";
import {useAuth} from "../contexts/auth_context";
import {Message} from "../utils/typings";
import ChatMessage from "./ChatMessage";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { SendIcon } from "../utils/icons";
import { nanoid } from 'nanoid'


interface ChatBoxProps {
	chatroom_uid : string | null
}

const ChatBox = ( { chatroom_uid } : ChatBoxProps ) => {
	// Input state
	const [ new_message, set_new_message ] = useState<string>( '' );

	const [ message_post_error, set_message_post_error ] = useState<string | null>( null )

	const { current_user } = useAuth();
	const { uid } = current_user;

	// Handle getting data
	// const messages_ref = collection( db, 'messages' );
	// const q = query( messages_ref, where( 'chatroom_uid', '==', chatroom_uid ) );


	const q = query( collectionGroup( db, 'messages' ), orderBy( 'timestamp' ) );
	const [ messages,loading ] = useCollectionData (q, { idField: 'id' } );

	const message_form_handler = async ( e : ChangeEvent<HTMLFormElement> ) => {
		e.preventDefault();
		if( new_message.length > 0 ) {
			const message: Message = {
				text: new_message.trim(),
				timestamp: serverTimestamp() ,
				uid,
			}

			// reference to chatroom collection -> current chatroom ->
			// creates / finds messages subcollection -> creates new ID
			const ref = doc( db, 'chatrooms', chatroom_uid! , 'messages', nanoid() )
			await setDoc( ref, message )

			set_new_message( '' );
		}

	}

	const handle_new_message = ( e : ChangeEvent<HTMLInputElement> ) => {
		e.preventDefault();
		set_new_message( e.target.value );
	}

	return (
		<Container background='gray.100' maxW='80%' h='100%' pb={ 4 } pt={ 8 }>
			<Flex flexDir='column' justifyContent='space-between' h='100%'>
				<Flex flexDir='column'>
					{
						loading === true &&
						<p>LOADING</p>
					}
					{ messages &&
							messages.map( message => {
							return (
								<ChatMessage message={ message.text } recieved_message = { message.uid !== uid } key={ message.timestamp }/>
							);
						} )
					}
				</Flex>
				<form onSubmit={ message_form_handler }>
					<Flex>
						<InputGroup mt={ 10 }>
							<Input type='text' _hover={{ backgroundColor: 'white' }} _focus={{ backgroundColor : 'white' }} variant='filled' backgroundColor='white' py={ 6 } value={ new_message } onChange={ handle_new_message } placeholder='Enter a message' mr={ 3 }/>
							<InputRightElement right='40px' top='10%' children={ <SendIcon width='20px' height='20px' /> } />
						</InputGroup>
					</Flex>
				</form>
		</Flex>
		</Container>
	);
}
export default ChatBox;
