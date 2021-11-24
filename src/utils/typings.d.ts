export interface AppContext {
	current_user : User,
	signup: any,
	login: any,
	logout : any
}

export interface Message {
	text : string,
	timestamp: FieldValue,
	uid : string
}

