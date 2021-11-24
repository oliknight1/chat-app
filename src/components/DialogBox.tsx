import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";

interface DialogBoxProps {
	is_open : boolean,
		on_close : () => void,
		title : string,
		children : JSX.Element
}
const DialogBox = ( { is_open, on_close, title, children } : DialogBoxProps ) => (
	<>
		<Modal isOpen={ is_open } onClose={ on_close } motionPreset='slideInBottom' isCentered>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{ title }</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={ 10 }>
					{ children }
				</ModalBody>
			</ModalContent>
		</Modal>
	</>
)

export default DialogBox;
