import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import {useEffect, useState} from "react";
import {db} from "../config/firebase";

interface ChatPreviewProps {
	chatter_uid : string,
	chatroom_uid : string,
	set_chatroom : React.Dispatch<React.SetStateAction<any>>

}

const ChatPreview = ( { chatter_uid, chatroom_uid, set_chatroom } : ChatPreviewProps ) => {
	const [ user, set_user ] = useState<DocumentData>();
	useEffect( () => {
		// search user document for chatter_uid
		( async () => {
			const ref = doc( db, 'users', chatter_uid )
			const snapshot = await getDoc( ref )
			if ( snapshot.exists() ) {
				set_user( snapshot.data() )
			} 
		} )();
	}, [ chatter_uid ] );
	if ( !user ) {
		return null;
	}
	
	return (
		<Button onClick={ () => set_chatroom( chatroom_uid ) } w='md' h='fit-content' variant='unstyled' fontWeight='inherit' textAlign='left' _hover={{ backgroundColor : 'gray.100' }} borderRadius='none'>
			<Flex align='center'>
				<img src={ user.photo_url } alt='Profile'/>
				<Box maxW='xs'>
					<Heading fontSize='2xl' fontWeight='regular'>{ user.display_name }</Heading>
					<Text isTruncated>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci hic dolorum omnis pariatur voluptates dolorem earum placeat impedit sit dolore alias quas laborum ea ipsum, reprehenderit, fugit nisi veritatis inventore.</Text>
				</Box>
			</Flex>
		</Button>
	);
}

export default ChatPreview;
