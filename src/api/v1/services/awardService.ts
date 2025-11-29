import { db } from "../../../../config/firebaseConfig";
import { Award } from "../models/awardModel";

/**
 * Retrieves all awards from Firestore
 * @returns A list of all awards
 */
export const getAllAwards = async (): Promise<Award[]> => {
    const snapshot: FirebaseFirestore.QuerySnapshot = await db.collection("awards").get();
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Award[];
};

/**
 * Creates a new award in Firestore
 * @param awardData - The award data to create
 * @returns The newly created award
 */
export const createAward = async (awardData: Omit<Award, "id">): Promise<Award> => {
    const newDoc: FirebaseFirestore.DocumentReference = await db.collection("awards").add(awardData);
    const created: FirebaseFirestore.DocumentSnapshot = await newDoc.get();
    return { id: created.id, ...created.data() } as Award;
};

/**
 * Gets an award record by its ID from Firestore
 * @param id - The ID of the award to retrieve
 * @returns The award record or null if not found
 */
export const getAwardById = async (id: string): Promise<Award | null> => {
    const awardRef: FirebaseFirestore.DocumentReference = db.collection("awards").doc(id);
    const awardDoc: FirebaseFirestore.DocumentSnapshot = await awardRef.get();

    if (!awardDoc.exists) {
        return null;
    }
    return { id: awardDoc.id, ...awardDoc.data() } as Award;
}

/**
 * Updates an existing award record in Firestore
 * @param id - The ID of the award to update
 * @param awardData - The updated award data
 * @returns The updated award record
 */
export const updateAward = async (id: string, awardData: Partial<Award>): Promise<Award> => {
    const awardRef: FirebaseFirestore.DocumentReference = db.collection("awards").doc(id);
    await awardRef.update(awardData);
    const updated: FirebaseFirestore.DocumentSnapshot = await awardRef.get();
    return { id: updated.id, ...updated.data() } as Award;
};

/**
 * Deletes an award record from Firestore
 * @param id - The ID of the award to delete
 */
export const deleteAward = async (id: string): Promise<void> => {
    await db.collection("awards").doc(id).delete();
};