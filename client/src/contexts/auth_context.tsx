import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../utils/typings';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, UserCredential, onAuthStateChanged, User } from 'firebase/auth';
const AuthContext = React.createContext( {} as AppContext );

export const useAuth = () => useContext( AuthContext );

const AuthProvider = ( { children } : any ) => {
	const [ current_user, set_current_user ] = useState<User | null>()

	// Returns a promise to be consumed by signup component
	const signup = ( email : string, password : string ) : Promise<UserCredential> => {
		return createUserWithEmailAndPassword( auth, email, password )
	}

	// Make sure to unsubscribe from listener once component is mounted
	useEffect( () => {
		const unsubscribe = onAuthStateChanged( auth, ( user ) => set_current_user( user ) )
		return unsubscribe;
	}, [] );

	const value : AppContext = {
		current_user,
		signup
	}

	return (
		<AuthContext.Provider value={ value }>
			{ children }
		</AuthContext.Provider>
	);

}
export default AuthProvider;