// getData.js
import firebase_app from "../config";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

export async function getFirestoreData(collection, id) {
    try {
        const docRef = doc(db, collection, id);
        const result = await getDoc(docRef);
        return { result, error: null };
    } catch (error) {
        return { result: null, error };
    }
}
