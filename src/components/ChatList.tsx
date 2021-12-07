import {collection, orderBy, query, where} from "firebase/firestore";
import {db} from "../config/firebase";
import {useAuth} from "../contexts/auth_context";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Container, Fade, SlideFade, VStack} from "@chakra-ui/react";
import ChatPreview from "./ChatPreview";

interface ChatListProps {
	set_chatroom : React.Dispatch<React.SetStateAction<any>>,
}

const ChatList = ( { set_chatroom } : ChatListProps ) => {
	const { current_user } = useAuth();
	const { uid } = current_user;

	const chatroom_ref = collection( db, 'chatrooms' );
	const q = query( chatroom_ref, where( 'members_uid', 'array-contains', uid ) , orderBy( 'last_msg_at', 'desc' ));
	const [ chats ] = useCollectionData (q, { idField: 'id' } );
	console.log( chats )
	if ( chats?.length === 0 ) {
		return null;
	}
	return (
		<SlideFade in={ true } offsetX='-200px' transition={{ enter : { duration : 0.7 } }}>
			<Container w='md' background='white' pt={ 5 }>
			<VStack
				spacing={ 10 }
				h='100vh'
				overflowY='auto'
				overflowX='hidden'
				position='relative'
			>
			{
				chats?.map( chat => {
					const chatter_uid = chat.members_uid.filter( ( member_uid : string ) => member_uid !== uid );
					return (
						<Fade in={ true } style={{ transition: 'opacity ease-in 0.2s' }} key={ chatter_uid[0] }>
							<ChatPreview  chatroom_uid={ chat.id } chatter_uid={ chatter_uid[0] } set_chatroom={ set_chatroom } />
						</Fade>
					);
				})
			}
		</VStack>
	</Container>
	</SlideFade>
	)
}
export default ChatList;
