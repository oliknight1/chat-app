import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { collection, doc, DocumentData, getDoc, limit, orderBy, query } from "firebase/firestore";
import {useEffect, useState} from "react";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {db} from "../config/firebase";
import {useAuth} from "../contexts/auth_context";

interface ChatPreviewProps {
	chatter_uid : string,
	chatroom_uid : string,
	set_chatroom : React.Dispatch<React.SetStateAction<any>>

}

const ChatPreview = ( { chatter_uid, chatroom_uid, set_chatroom } : ChatPreviewProps ) => {
	const [ user, set_user ] = useState<DocumentData>();
	const [ img_loaded, set_img_loaded ] = useState<boolean>( false );

	const ref = collection( db, 'chatrooms', chatroom_uid, 'messages' )
	const q = query( ref, orderBy( 'timestamp', 'desc' ), limit( 1 ) );
	const [ latest_msg ] = useCollectionData( q, { idField: 'id' } )

	const { current_user } = useAuth();
	const { uid } = current_user;

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
		} )();
	}, [ chatter_uid, chatroom_uid ] );
	if ( !user ) {
		return null;
	}

	return (
		<Button
			onClick={ () => set_chatroom( chatroom_uid ) }
			w='md'
			h='fit-content'
			variant='unstyled'
			fontWeight='inherit'
			textAlign='left'
			_hover={{ backgroundColor : 'gray.100' }}
			borderRadius='none'
			opacity={ img_loaded ? 1 : 0 }
		>
			<Flex align='center'>
				<img src={ user.photo_url } alt='Profile' onLoad={ () => { set_img_loaded( true ) } }/>
				<Box maxW='xs'>
					<Heading fontSize='2xl' fontWeight='regular'>{ user.display_name }</Heading>
					{
						latest_msg &&
						<Text isTruncated color='gray.500' fontWeight='light' mt={ 2 }>{ latest_msg[0].user_uid === uid ? 'You: ': `${ user.display_name.split( ' ' )[0] }: ` }{ latest_msg[0].text }</Text>
					}
				</Box>
			</Flex>
		</Button>
	);
}

export default ChatPreview;
