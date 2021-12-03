import {Box, Container, VStack, Text, Flex, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import {collection, FieldValue, getDoc, getDocs, limit, orderBy, query, where, doc } from "firebase/firestore";
import {useEffect, useState} from "react";
import {db} from "../config/firebase";
import {useAuth} from "../contexts/auth_context";
import {Message, UserData} from "../utils/typings";
import { motion } from 'framer-motion'


interface DashboardItem  {
	chatroom_uid : string
	last_msg_at : FieldValue,
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

	const [ chats, set_chats ] = useState<DashboardItem[]>([]);
	const [ is_loading, set_is_loading ] = useState<boolean>( false );

	useEffect( () => {
		// Search for every chatroom containing user
		( async () => {
			set_is_loading( true )
			const chatroom_ref = collection( db, 'chatrooms' );
			const chatroom_q = query( chatroom_ref, where( 'members_uid', 'array-contains', uid ) );
			const chatroom_snapshot = await getDocs( chatroom_q );

			// An array containing data on the chatroom & containing limited messages from the chatroom
			let data : DashboardItem[] = []
			chatroom_snapshot.docs.forEach( async ( document )  => {

				const last_msg_at = document.data().last_msg_at.toDate();

				// Get user data from chatroom
				const chatter_uid = document.data().members_uid.find( ( chatter_uid : string ) => chatter_uid !== uid );
				const user_snapshot = await getDoc( doc( db, 'users', chatter_uid ) );
				const user_data = user_snapshot.data() as UserData;


				// Get all messages from the chatrooms
				const messages_ref = collection( db, 'chatrooms', document.id, 'messages' )
				const messages_q = query( messages_ref, orderBy( 'timestamp', 'desc' ), limit( 5 ) );
				const messages_snapshot = await getDocs( messages_q );

				let msg_arr : Message[] = [];
				await Promise.all( messages_snapshot.docs.map( async ( msg_doc : any ) => {
					msg_arr = [...msg_arr, { id: msg_doc.id, ...msg_doc.data() } ]
				} ) );
				const data_to_add : DashboardItem = {
					chatroom_uid : document.id,
					last_msg_at,
					user_data,
					messages : msg_arr
				}
				data = [...data, data_to_add];
				set_chats( chats?.concat( data ) );

				set_is_loading( false )
			} );
		} )();

	}, [] );
	return (
		<Box w='100%' h='100%' opacity={ visible ? 1 : 0 }>
			<Spinner color='teal.dark' size='xl' thickness='4px'  position='absolute' top='50%' left='46%' opacity={ is_loading ? 1 : 0 } transition='opacity ease 0.2s'/>
			<Heading mb={ 10 } fontWeight='500'>All rooms</Heading>
			<SimpleGrid minChildWidth='180px'>
				{
					chats.map( ( chat : DashboardItem ) => {
						return(
							<ChatroomPreview
								key={ chat.chatroom_uid }
								user_data={ chat.user_data }
								messages={ chat.messages }
								chatroom_uid={ chat.chatroom_uid }
								set_chatroom={ set_chatroom } />
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

const MotionBox = motion( Box );

const ChatroomPreview = ( { user_data, messages, set_chatroom, chatroom_uid } : ChatroomPreviewProps ) => {
	return (
		<MotionBox
			as='button'
			minW='sm' maxW='md'
			h='fit-content'
			textAlign='left'
			background='white'
			p={ 4 }
			rounded='2xl'
			boxShadow='md'
			whilehover={{ opacity: 0 }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
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
		</MotionBox>
	);
}




export default ChatDashboard;
