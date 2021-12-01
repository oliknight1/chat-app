import {collection, orderBy, query, where} from "firebase/firestore";
import {db} from "../config/firebase";
import {useAuth} from "../contexts/auth_context";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {VStack} from "@chakra-ui/react";
import ChatPreview from "./ChatPreview";

interface ChatListProps {
	set_chatroom : React.Dispatch<React.SetStateAction<any>>
}

const ChatList = ( { set_chatroom } : ChatListProps ) => {
	const { current_user } = useAuth();
	const { uid } = current_user;

	const chatroom_ref = collection( db, 'chatrooms' );
	const q = query( chatroom_ref, where( 'members_uid', 'array-contains', uid ) , orderBy( 'last_msg_at' ));
	const [ chats, loading ] = useCollectionData (q, { idField: 'id' } );

	return (
		<VStack spacing={ 10 }>
			{
				chats?.map( chat => {
					const chatter_uid = chat.members_uid.filter( ( member_uid : string ) => member_uid !== uid );
					return (<ChatPreview key={ chatter_uid[0] } chatroom_uid={ chat.id } chatter_uid={ chatter_uid[0] } set_chatroom={ set_chatroom } /> )
				})
			}
		</VStack>
	)
}
export default ChatList;
