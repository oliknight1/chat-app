import { Button } from "@chakra-ui/react"

interface SendIconProps {
	width : string,
	height: string
}
const SendIcon = ( { width , height } : SendIconProps ) => (
	<Button background='teal.dark' w='fit-content' p={ 2 } borderRadius='full' _hover={{ background: 'teal.dark' }} type='submit'>
		<svg style={{ width : width, height: height, color: 'white', margin : '0 auto' }} viewBox="0 0 24 24">
			<path fill="currentColor" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
		</svg>
	</Button>
)
export default SendIcon
