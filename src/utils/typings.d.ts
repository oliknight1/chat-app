export interface AppContext {
	current_user: User,
	signup: any,
	login: any,
	logout : any
}

export interface UserData {
	display_name : string,
	email: string,
	photo_url: string
}

export interface Message {
	text : string,
	timestamp: FieldValue,
	uid : string
}

export interface Chatroom {
	members_uid: string[],
	last_msg_at : FieldValue
}

