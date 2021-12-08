import {Box, Fade, Heading, Text} from "@chakra-ui/react"

interface NoChatsDialogProps {
	visible : boolean
}

const NoChatsDialog = ( { visible } : NoChatsDialogProps ) => (
	<Fade in={ visible }>
		<Box
			w={ ['2xs', 'md'] }
			h='fit-content'
			background='white'
			py={ 6 }
			px={ 8 }
			rounded='2xl'
			position='absolute'
			top='50%'
			left='30%'
			boxShadow='lg'
		>

			<Heading fontSize='2xl' fontWeight='600' mb={ 3 }>No open chat</Heading>
			<Text>Please click a chat on the sidebar to view messages</Text>
		</Box>
	</Fade>
)
export default NoChatsDialog;
