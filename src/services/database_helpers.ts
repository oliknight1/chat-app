import {addDoc, collection, doc, DocumentData, getDoc} from "firebase/firestore";
import {db} from "../config/firebase";

export const write_to_db = async <T>( document : string, data : T, error_handler? : ( error : string ) => void ) => {
	try {
		await addDoc(collection(db, document), data );
	} catch ( error ) {
		if( error_handler ) {
			error_handler( error as string );
		}
	}
}

export const get_doc_by_id = async ( doc_name : string, id : string ) : Promise<DocumentData> => {
	return getDoc( doc( db, doc_name, id ) );
}
