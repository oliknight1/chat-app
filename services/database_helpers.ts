import {doc, DocumentData, getDoc} from "firebase/firestore";
import {db} from "../config/firebase";

export const get_doc_by_id = async ( doc_name : string, id : string ) : Promise<DocumentData> => {
	return getDoc( doc( db, doc_name, id ) );
}
