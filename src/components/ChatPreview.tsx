import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import {useEffect, useState} from "react";
import {db} from "../config/firebase";

interface ChatPreviewProps {
	uid : string
}

const ChatPreview = ( { uid } : ChatPreviewProps ) => {
	const [ user, set_user ] = useState<DocumentData>();
	useEffect( () => {
		// search user document for uid
		( async () => {
			const ref = doc( db, 'users', uid )
			const snapshot = await getDoc( ref )
			if ( snapshot.exists() ) {
				set_user( snapshot.data() )
			} 
		} )();
	}, [ uid ] );
	if ( !user ) {
		return null;
	}
	return (
		<Button w='md' h='fit-content' variant='unstyled' fontWeight='inherit' textAlign='left' _hover={{ backgroundColor : 'gray.100' }} borderRadius='none'>
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
