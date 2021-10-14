import express, { Request, Response } from 'express';

export const user_router = express.Router();

user_router.get( '/', ( _req : Request, res : Response ) => {
	res.send( 'router works' );
} );

