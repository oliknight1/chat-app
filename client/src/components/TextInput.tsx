import { FormControl, FormLabel, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { ReactElement } from 'react'

type TextInputProps = {
	id : string,
	label : string,
	icon : ReactElement,
	state: string,
	type : string
	set_state:  React.Dispatch<React.SetStateAction<any>>
}

const TextInput = ( { id, label, type, icon, state, set_state } : TextInputProps ) => {
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
				<Input variant='outline' size='lg' type={ type } placeholder='Enter a username' value={ state } onChange={ handle_change } />
			</InputGroup>
		</FormControl>
	)
}
export default TextInput
