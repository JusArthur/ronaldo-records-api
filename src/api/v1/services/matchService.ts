import { db } from "../../../../config/firebaseConfig";
import { Match } from "../models/matchModel";

/**
 * Retrieves all match records from Firestore
 * @returns A list of all matches
 */
export const getAllMatches = async (): Promise<Match[]> => {
    const snapshot = await db.collection("matches").get();
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Match[];
};

/**
 * Creates a new match record in Firestore
 * @param matchData - The match data to create
 * @returns The newly created match
 */
export const createMatch = async (matchData: Omit<Match, "id">): Promise<Match> => {
    const newDoc = await db.collection("matches").add(matchData);
    const created = await newDoc.get();
    return { id: created.id, ...created.data() } as Match;
};

/**
 * Updates an existing match record in Firestore
 * @param id - The ID of the match to update
 * @param matchData - The updated match data
 * @returns The updated match record
 */
export const updateMatch = async (id: string, matchData: Partial<Match>): Promise<Match> => {
    const matchRef = db.collection("matches").doc(id);
    await matchRef.update(matchData);
    const updated = await matchRef.get();
    return { id: updated.id, ...updated.data() } as Match;
};

/**
 * Deletes a match record from Firestore
 * @param id - The ID of the match to delete
 */
export const deleteMatch = async (id: string): Promise<void> => {
    await db.collection("matches").doc(id).delete();
};
