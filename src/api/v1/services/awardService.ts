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
export const createAward = async (clubData: Omit<Award, "id">): Promise<Award> => {
    const newDoc: FirebaseFirestore.DocumentReference = await db.collection("awards").add(clubData);
    const created: FirebaseFirestore.DocumentSnapshot = await newDoc.get();
    return { id: created.id, ...created.data() } as Award;
};
