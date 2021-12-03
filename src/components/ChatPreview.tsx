import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { collection, doc, DocumentData, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import {useEffect, useState} from "react";
import {db} from "../config/firebase";

interface ChatPreviewProps {
	chatter_uid : string,
		chatroom_uid : string,
		set_chatroom : React.Dispatch<React.SetStateAction<any>>

}

const ChatPreview = ( { chatter_uid, chatroom_uid, set_chatroom } : ChatPreviewProps ) => {
	const [ user, set_user ] = useState<DocumentData>();
	const [ latest_msg, set_latest_msg ] = useState<string>( '' )
	useEffect( () => {
		// Search user document for chatter_uid
		( async () => {
			const user_ref = doc( db, 'users', chatter_uid )
			const user_snapshot = await getDoc( user_ref )
			if ( user_snapshot.exists() ) {
				set_user({
						uid : user_snapshot.id,
						...user_snapshot.data()
					});
			}
			// Search for latest message to set as preview
			if( user_snapshot.id ) {
				const ref = collection( db, 'chatrooms', chatroom_uid, 'messages' )
				const q = query( ref, orderBy( 'timestamp', 'desc' ) );
				const messages_snapshot = await getDocs( q );

				const find_helper = ( doc  : DocumentData ) => {
					if( doc.data().user_uid === user_snapshot.id ) {
						return doc.data()
					}
				}
				const preview_msg = messages_snapshot.docs.find( find_helper )?.data()
				set_latest_msg( preview_msg?.text )
			}
		} )();
	}, [ chatter_uid, chatroom_uid ] );
	if ( !user ) {
		return null;
	}

	return (
		<Button onClick={ () => set_chatroom( chatroom_uid ) } w='md' h='fit-content' variant='unstyled' fontWeight='inherit' textAlign='left' _hover={{ backgroundColor : 'gray.100' }} borderRadius='none'>
			<Flex align='center'>
				<img src={ user.photo_url } alt='Profile'/>
				<Box maxW='xs'>
					<Heading fontSize='2xl' fontWeight='regular'>{ user.display_name }</Heading>
					<Text isTruncated>{ latest_msg }</Text>
				</Box>
			</Flex>
		</Button>
	);
}

export default ChatPreview;
