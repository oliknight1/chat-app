import express, { Request, Response } from 'express';
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export const user_router = express.Router();

// TODO: Handle invalid login / register

user_router.post( '/login', ( req : Request, _res : Response ) => {
	const email : string = req.body.email;
	const password : string = req.body.password;
	signInWithEmailAndPassword( auth, email, password )
		.then( ( user_credential ) => {
			console.log( user_credential );
		} )
	.catch();
} );

user_router.post( '/register', ( req : Request, _res : Response ) => {
	const email : string = req.body.email;
	const password : string = req.body.password;
	console.log( 'run' );
	createUserWithEmailAndPassword( auth, email, password )
		.then( ( user_credential ) => {
			console.log( user_credential );
		} )
	.catch( ( Error ) => {
		console.log( 'itnhas errored', Error );
	} );

} );

