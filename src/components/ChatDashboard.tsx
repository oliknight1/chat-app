import {Box, Container, VStack, Text, Flex, Heading, SimpleGrid} from "@chakra-ui/react";
import {useEffect, useState} from "react";

const ChatHome = () => {

	const [ chats, set_chats ] = useState(
		[
			{
				name : 'Oli Knight',
				photo_url: 'https://firebasestorage.googleapis.com/v0/b/picchat-6f594.appspot.com/o/default_user.png?alt=media&token=bb8c6886-db7e-4d67-8a9d-8e227859bd80',
				messages : [
					'Consectetur sit praesentium perspiciatis mollitia consequuntur! Rem quae dolor corporis dicta numquam Tenetur adipisci dolore deleniti maiores minus, nam, assumenda voluptates dicta? Minima eius temporibus tempora ex quis doloribus? Dolore',
					'this is a message 2',
					'this is a message 3',
				]
			},
			{
				name : 'Oli Knight',
				photo_url: 'https://firebasestorage.googleapis.com/v0/b/picchat-6f594.appspot.com/o/default_user.png?alt=media&token=bb8c6886-db7e-4d67-8a9d-8e227859bd80',
				messages : [
					'this is a message 1',
					'this is a message 2',
					'this is a message 3',
				]
			},
			{
				name : 'Oli Knight',
				photo_url: 'https://firebasestorage.googleapis.com/v0/b/picchat-6f594.appspot.com/o/default_user.png?alt=media&token=bb8c6886-db7e-4d67-8a9d-8e227859bd80',
				messages : [
					'Consectetur sit praesentium perspiciatis mollitia consequuntur! Rem quae dolor corporis dicta numquam Tenetur adipisci dolore deleniti maiores minus, nam, assumenda voluptates dicta? Minima eius temporibus tempora ex quis doloribus? Dolore',
					'this is a message 2',
					'this is a message 3',
				]
			},
			{
				name : 'Oli Knight',
				photo_url: 'https://firebasestorage.googleapis.com/v0/b/picchat-6f594.appspot.com/o/default_user.png?alt=media&token=bb8c6886-db7e-4d67-8a9d-8e227859bd80',
				messages : [
					'Consectetur sit praesentium perspiciatis mollitia consequuntur! Rem quae dolor corporis dicta numquam Tenetur adipisci dolore deleniti maiores minus, nam, assumenda voluptates dicta? Minima eius temporibus tempora ex quis doloribus? Dolore',
					'this is a message 2',
					'this is a message 3',
				]
			},
		]
	)

	useEffect( () => {
		// Search for every chatroom containing user

		// Get all messages from every chat
	}, [] )
	return (
		<Container background='gray.100' maxW='80%' h='100%' p={ 10 }>
			<Heading mb={ 10 } fontWeight='500'>All rooms</Heading>
			<SimpleGrid minChildWidth='320px' gap={ 10 }>
				{
					chats.map( ( chat : any ) => <ChatroomPreview chat={ chat } /> ) 
				}
			</SimpleGrid>
		</Container>
	)
}

const ChatroomPreview = ( { chat } : any ) => {
	return (
		<Box as='button' minW='sm' maxW='md' textAlign='left' background='white' p={ 4 } rounded='2xl' boxShadow='md' transition='all ease 0.2s' _hover={{ boxShadow: 'xl' }}>
			<Flex flexDir='row' alignItems='center'>
				<img src={ chat.photo_url } alt='user avatar' height='48px' width='48px'/>
				<Box ml={ 5 } >
					<Heading mb={ 3 } color='teal.dark' fontSize='lg' fontWeight='500'>{ chat.name }</Heading>
					<VStack align='stretch' >
						{ 
							chat.messages.map( ( msg : string ) => (
								<Flex maxW='2xs' alignItems='center'>
									<Text mr={ 3 } color='gray' fontWeight='light' fontSize='sm'>09:00</Text>
									<Text isTruncated>{ msg }</Text>
								</Flex>
							) ) 
						}
					</VStack>
				</Box>
			</Flex>
		</Box>
	);
}

export default ChatHome;
