import { FormControl, FormLabel, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { ReactElement } from 'react'

type UserAuthTextInputProps = {
	id : string,
	label : string,
	icon : ReactElement,
	state: string,
	type : string
	set_state: React.Dispatch<React.SetStateAction<any>>,
	placeholder : string
}

const UserAuthTextInput = ( { id, label, type, icon, state, set_state, placeholder } : UserAuthTextInputProps ) => {
	const handle_change = ( e : React.FormEvent<HTMLInputElement> ) => {
		set_state( e.currentTarget.value.trim() );
	}
	return (
		<FormControl id={ id } isRequired mb={ 5 }>
			<FormLabel>
				{ label }
			</FormLabel>
			<InputGroup>
				<InputLeftElement
					top='10%'
					pointerEvents='none'
					children={ icon }
				/>
				<Input variant='outline' size='lg' type={ type } placeholder={ placeholder } value={ state } onChange={ handle_change } />
			</InputGroup>
		</FormControl>
	)
}
export default UserAuthTextInput
