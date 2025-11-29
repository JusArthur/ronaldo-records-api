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

/**
 * Gets a club record by its ID from Firestore
 * @param id - The ID of the club to retrieve
 * @returns The club record or null if not found
 */
export const getClubById = async (id: string): Promise<Club | null> => {
    const clubRef: FirebaseFirestore.DocumentReference = db.collection("clubs").doc(id);
    const clubDoc: FirebaseFirestore.DocumentSnapshot = await clubRef.get();

    if (!clubDoc.exists) {
        return null;
    }
    return { id: clubDoc.id, ...clubDoc.data() } as Club;
}

/**
 * Updates an existing club record in Firestore
 * @param id - The ID of the club to update
 * @param clubData - The updated club data
 * @returns The updated club record
 */
export const updateClub = async (id: string, clubData: Partial<Club>): Promise<Club> => {
    const clubRef: FirebaseFirestore.DocumentReference = db.collection("clubs").doc(id);
    await clubRef.update(clubData);
    const updated: FirebaseFirestore.DocumentSnapshot = await clubRef.get();
    return { id: updated.id, ...updated.data() } as Club;
};

/**
 * Deletes a club record from Firestore
 * @param id - The ID of the club to delete
 */
export const deleteClub = async (id: string): Promise<void> => {
    await db.collection("clubs").doc(id).delete();
};