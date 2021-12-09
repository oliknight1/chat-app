import {collection, orderBy, query, where} from "firebase/firestore";
import {db} from "../config/firebase";
import {useAuth} from "../contexts/auth_context";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Box, Container, Fade, Heading, SlideFade, VStack, Text, useBreakpoint} from "@chakra-ui/react";
import ChatPreview from "./ChatPreview";
import {useEffect} from "react";
import NoChatsDialog from "./NoChatsDialog";

interface ChatListProps {
	set_chatroom : React.Dispatch<React.SetStateAction<any>>,
	set_open: React.Dispatch<React.SetStateAction<any>>,
	open : boolean,
}

const ChatList = ( { set_chatroom, open, set_open } : ChatListProps ) => {
	const { current_user } = useAuth();
	const { uid } = current_user;

	const chatroom_ref = collection( db, 'chatrooms' );
	const q = query( chatroom_ref, where( 'members_uid', 'array-contains', uid ) , orderBy( 'last_msg_at', 'desc' ));
	const [ chats ] = useCollectionData (q, { idField: 'id' } );

	useEffect( () => {
		if( chats?.length && chats.length > 0 ) {
			set_chatroom( chats[0].id )
			return;
		}
	}, [ chats ] );

	const current_breakpoint = useBreakpoint();

	if( !open ) {
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

					chats?.length === 0 &&
						<NoChatsDialog />
					}
				{
					chats?.map( chat => {
						const chatter_uid = chat.members_uid.filter( ( member_uid : string ) => member_uid !== uid );
						return (
							<Fade in={ true } style={{ transition: 'opacity ease-in 0.2s' }} key={ chatter_uid[0] }>
								<ChatPreview  chatroom_uid={ chat.id } chatter_uid={ chatter_uid[0] } set_chatroom={ set_chatroom } set_open={ set_open } />
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
