import {Box, VStack, Text, Flex, Heading, SimpleGrid, Spinner, Fade, SlideFade } from "@chakra-ui/react";
import {collection, getDoc, getDocs, limit, orderBy, query, where, doc } from "firebase/firestore";
import {useEffect, useState} from "react";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {db} from "../config/firebase";
import {useAuth} from "../contexts/auth_context";
import {Message, UserData} from "../utils/typings";


interface DashboardItem  {
	chatroom_uid : string
	user_data : UserData,
	messages : Message[]
}

interface ChatDashboardProps {
	set_chatroom : React.Dispatch<React.SetStateAction<any>>,
	visible : boolean
}

const ChatDashboard = ( { set_chatroom , visible } : ChatDashboardProps ) => {

	const { current_user } = useAuth();
	const { uid } = current_user

	const [ is_loading, set_is_loading ] = useState<boolean>( false );

	const [ chatroom_data, set_chatroom_data ] = useState<DashboardItem[]>([])

	// Get list of chatrooms in real-time
	const chatroom_ref = collection( db, 'chatrooms' );
	const chatroom_q = query( chatroom_ref, where( 'members_uid', 'array-contains', uid ) );
	const [ chatrooms ] = useCollectionData( chatroom_q, { idField : 'id' } )

	useEffect( () => {
		( async () => {
			set_is_loading( true );

			if( chatrooms?.length ) {
				chatrooms.forEach( async ( chatroom ) => {

					// Get data of the user that the current user is chatting with
					const chatter_uid = chatroom.members_uid.find( ( chatter_uid : string ) => chatter_uid !== uid );
					const user_snapshot = await getDoc( doc( db, 'users', chatter_uid ) );
					const user_data = user_snapshot.data() as UserData;

					const messages_ref = collection( db, 'chatrooms', chatroom.id, 'messages' )
					const messages_q = query( messages_ref, orderBy( 'timestamp', 'asc' ), limit( 5 ) );
					const messages_snapshot = await getDocs( messages_q );
					
					let msg_arr : Message[] = [];
					await Promise.all( messages_snapshot.docs.map( async ( msg_doc : any ) => {
						msg_arr = [...msg_arr, { id: msg_doc.id, ...msg_doc.data() } ]
					} ) );


					set_chatroom_data(
						[
							...chatroom_data,
							{
								chatroom_uid: chatroom.id,
								messages: msg_arr,
								user_data
							}
						]
					);

				} );
			}
			set_is_loading( false );
		} )();
	}, [ chatrooms ] );
	return (
		<Box w='100%' h='100%' opacity={ visible ? 1 : 0 }>
			<Fade in={ is_loading }>
				<Spinner position='absolute' top='50%' left='46%' />
			</Fade>
			<Heading mb={ 10 } fontWeight='500'>All rooms</Heading>
				{
					chatroom_data.length === 0 && is_loading === false &&
					<Box rounded='2xl' maxWidth='lg' boxShadow='md' background='white' margin='auto' p={ 10 }>
						<Heading fontSize='2xl' color='teal.dark' mb={ 4 }>You have no open chatrooms</Heading>
						<Text>Click the + icon to get started!</Text>
					</Box>
				}
			<SimpleGrid minChildWidth='180px'>
				{
					chatroom_data.map( ( chat : DashboardItem ) => {
						return(
							<ChatroomPreview
								key={ chat.chatroom_uid }
								user_data={ chat.user_data }
								messages={ chat.messages }
								chatroom_uid={ chat.chatroom_uid }
								set_chatroom={ set_chatroom }
							/>
						);
					} )
				}
			</SimpleGrid>
		</Box>
	)
}

interface ChatroomPreviewProps {
	user_data : UserData,
	messages : Message[],
	set_chatroom : React.Dispatch<React.SetStateAction<any>>,
	chatroom_uid: string
}

const ChatroomPreview = ( { user_data, messages, set_chatroom, chatroom_uid } : ChatroomPreviewProps ) => (
	<SlideFade in={ true } offsetY='50px'>
	<Box
		as='button'
		minW='sm' maxW='md'
		h='fit-content'
		textAlign='left'
		background='white'
		p={ 4 }
		rounded='2xl'
		boxShadow='md'
		_hover={{ boxShadow: 'xl' }}
		style={{ transition: 'box-shadow ease-in-out 0.1s' }}
		onClick={ () => set_chatroom( chatroom_uid ) }
	>
		<Flex flexDir='row' alignItems='center'>
			<img src={ user_data.photo_url } alt='user avatar' height='48px' width='48px'/>
			<Box ml={ 5 } >
				<Heading mb={ 3 } color='teal.dark' fontSize='lg' fontWeight='500'>{ user_data.display_name }</Heading>
				<VStack align='stretch' >
					{
						messages.map( ( msg : Message ) => {
							const timestamp_date = msg.timestamp.toDate();
							const hours = timestamp_date.getHours();
							const minutes = ( timestamp_date.getMinutes()<10?'0':'') + timestamp_date.getMinutes();
							return (
								<Flex maxW='2xs' alignItems='center' key={ msg.id } >
									<Text mr={ 3 } color='gray' fontWeight='light' fontSize='sm'>{ `${ hours }:${ minutes }` }</Text>
									<Text isTruncated>{ msg.text }</Text>
								</Flex>
							)
						})
					}
				</VStack>
			</Box>
		</Flex>
	</Box>
</SlideFade>
);





export default ChatDashboard;
