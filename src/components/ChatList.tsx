import {collection, orderBy, query, where} from "firebase/firestore";
import {db} from "../config/firebase";
import {useAuth} from "../contexts/auth_context";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {Box} from "@chakra-ui/react";
import ChatPreview from "./ChatPreview";

const ChatList = () => {
	const { current_user } = useAuth();
	const { uid } = current_user;

	const chatroom_ref = collection( db, 'chatrooms' );
	const q = query( chatroom_ref, where( 'members_uid', 'array-contains', uid ) , orderBy( 'last_msg_at' ));
	const [ chats, loading ] = useCollectionData (q, { idField: 'id' } );

	return (
		<Box>
			{
				chats?.map( chat => {
					const chatter_uid = chat.members_uid.filter( ( member_uid : string ) => member_uid !== uid );
					return ( <ChatPreview key={ chatter_uid[0] } uid={ chatter_uid[0] } /> )
				})
			}
		</Box>
	)
}
export default ChatList;
