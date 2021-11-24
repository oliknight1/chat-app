import ChatBox from "./ChatBox";
import Sidebar from './Sidebar';
import ChatList from './ChatList';
import {Flex} from "@chakra-ui/react";

const ChatPage = () => {
	return (
		<Flex>
			<Sidebar />
			<ChatList />
			<ChatBox />
		</Flex>
	);
}
export default ChatPage;
