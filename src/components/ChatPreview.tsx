import { Box, Button, Flex, Heading, Text, Avatar, useBreakpoint } from "@chakra-ui/react";
import { collection, doc, DocumentData, getDoc, limit, orderBy, query } from "firebase/firestore";
import {useEffect, useState} from "react";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {db} from "../config/firebase";
import {useAuth} from "../contexts/auth_context";
import { get_doc_by_id } from "../services/database_helpers";

interface ChatPreviewProps {
	chatter_uid : string,
	chatroom_uid : string,
	set_chatroom : React.Dispatch<React.SetStateAction<any>>,
	set_open: React.Dispatch<React.SetStateAction<any>>


}

const ChatPreview = ( { chatter_uid, chatroom_uid, set_chatroom, set_open } : ChatPreviewProps ) => {
	const [ user, set_user ] = useState<DocumentData>();

	const ref = collection( db, 'chatrooms', chatroom_uid, 'messages' )
	const q = query( ref, orderBy( 'timestamp', 'desc' ), limit( 1 ) );
	const [ latest_msg ] = useCollectionData( q, { idField: 'id' } )

	const { current_user } = useAuth();
	const { uid } = current_user;

	const current_breakpoint = useBreakpoint();

	useEffect( () => {
		get_doc_by_id( 'users', chatter_uid ).then( doc => {
			set_user( {
				uid: doc.id,
				...doc.data()
			} )
		} )
	}, [ chatter_uid, chatroom_uid ] );
	if ( !user ) {
		return null;
	}

	const handle_click = () => {
		set_chatroom( chatroom_uid );
		if( current_breakpoint === 'base' || current_breakpoint === 'sm' || current_breakpoint ==='md' ) {
			set_open( false );
		}
	}

	return (
		<Button
			onClick={ handle_click }
			w='md'
			h='fit-content'
			variant='unstyled'
			fontWeight='inherit'
			textAlign='left'
			_hover={{ boxShadow: 'lg' }}
			borderRadius='none'
			pl={ 5 }
			py={ 3 }
		>
			<Flex align='center'>
				<Avatar name={ user.display_name } loading='lazy' mr={ 4 } w='3rem' h='3rem'/>
				<Box maxW='70%' >
					<Heading fontSize='2xl' fontWeight='regular'>{ user.display_name }</Heading>
					{
						latest_msg && latest_msg.length  > 0 &&
						<Text isTruncated color='gray.500' fontWeight='light' mt={ 2 }>{ latest_msg[0].user_uid === uid ? 'You: ': `${ user.display_name.split( ' ' )[0] }: ` }{ latest_msg[0].text }</Text>
					}
				</Box>
			</Flex>
		</Button>
	);
}

export default ChatPreview;
