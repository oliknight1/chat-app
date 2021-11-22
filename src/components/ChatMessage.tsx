
interface ChatMessageProps {
	message : string
}

const ChatMessage = ( { message } : ChatMessageProps )=> {
	return (
		<p>{ message }</p>
	)
}

export default ChatMessage;
