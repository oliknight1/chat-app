import {collection, orderBy, query, where} from "firebase/firestore";
import {db} from "../config/firebase";
import {useAuth} from "../contexts/auth_context";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {VStack} from "@chakra-ui/react";
import ChatPreview from "./ChatPreview";
import {motion, useAnimation} from "framer-motion";

interface ChatListProps {
	set_chatroom : React.Dispatch<React.SetStateAction<any>>,
	visible : boolean
}

const ChatList = ( { set_chatroom, visible } : ChatListProps ) => {
	const { current_user } = useAuth();
	const { uid } = current_user;

	const chatroom_ref = collection( db, 'chatrooms' );
	const q = query( chatroom_ref, where( 'members_uid', 'array-contains', uid ) , orderBy( 'last_msg_at' ));
	const [ chats, loading ] = useCollectionData (q, { idField: 'id' } );

	const MotionVStack = motion( VStack );

	const variants = {
		hidden : {
			x: '-100%',
			position: 'absolute'
		},
		visible: {
			x : 0,
			position: 'relative'
		}
	}

	return (
		<MotionVStack spacing={ 10 } animate={ visible ? 'visible' : 'hidden' } variants={ variants } >
			{
				chats?.map( chat => {
					const chatter_uid = chat.members_uid.filter( ( member_uid : string ) => member_uid !== uid );
					return (<ChatPreview key={ chatter_uid[0] } chatroom_uid={ chat.id } chatter_uid={ chatter_uid[0] } set_chatroom={ set_chatroom } /> )
				})
			}
		</MotionVStack>
	)
}
export default ChatList;
