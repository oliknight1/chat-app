import * as dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { auth } from './config/firebase';
dotenv.config()
export const app = express();
app.use( cors() );
app.use( express.json() );

console.log( auth )
