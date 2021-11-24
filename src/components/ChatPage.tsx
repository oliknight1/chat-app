import ChatBox from "./ChatBox";
import Sidebar from './Sidebar';
import ChatList from './ChatList';
import {Button, Flex, HStack, Input, useDisclosure} from "@chakra-ui/react";
import DialogBox from "./DialogBox";
import {FormEvent} from "react";

const ChatPage = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const hanlde_chat_invite = ( e : FormEvent<HTMLFormElement> ) => {
		e.preventDefault();
	}
	return (
		<Flex height='100vh'>
			<Sidebar dialog_hanlder={ onOpen } />
			<ChatList />
			<ChatBox />
			<DialogBox is_open={ isOpen } on_close={ onClose } title='Start a chat with a user' >
				<form onSubmit={ hanlde_chat_invite }>
					<HStack spacing={ 2 }>
						<Input placeholder="Enter user's email"/>
						<Button type='submit' backgroundColor='teal.dark' color='white'>Submit</Button>
					</HStack>
				</form>
			</DialogBox>
		</Flex>
	);
}
export default ChatPage;
