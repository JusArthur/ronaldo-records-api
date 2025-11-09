import { db } from "../../../../config/firebaseConfig";
import { Club } from "../models/clubModel";

/**
 * Retrieves all club records from Firestore
 * @returns A list of all clubs
 */
export const getAllClubs = async (): Promise<Club[]> => {
    const snapshot: FirebaseFirestore.QuerySnapshot = await db.collection("clubs").get();
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Club[];
};

/**
 * Creates a new club record in Firestore
 * @param clubData - The club data to create
 * @returns The newly created club
 */
export const createClub = async (clubData: Omit<Club, "id">): Promise<Club> => {
    const newDoc: FirebaseFirestore.DocumentReference = await db.collection("clubs").add(clubData);
    const created: FirebaseFirestore.DocumentSnapshot = await newDoc.get();
    return { id: created.id, ...created.data() } as Club;
};
