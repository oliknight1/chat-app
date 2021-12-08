import {Box, Center, Fade, Heading, Text} from "@chakra-ui/react"

const NoChatsDialog = () => (
	<Center>
	<Fade in={ true }>
		<Box
			w={ [ '75%', '100%' ] }
			h='fit-content'
			background='white'
			py={ 6 }
			px={ 8 }
			rounded='2xl'
			boxShadow='lg'
		>

			<Heading fontSize='2xl' fontWeight='600' mb={ 3 }>You are not in any chatrooms <span >&#128532;</span> </Heading>
			<Text>Please click the + icon to create a chat!</Text>
		</Box>
	</Fade>
</Center>
)
export default NoChatsDialog;
