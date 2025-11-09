/**
 * Represents a single match record in the Cristiano Ronaldo Records API
 */
export interface Match {
    /** Firestore auto-generated document ID */
    id?: string;

    /** The opposing team Ronaldo played against */
    opponent: string;

    /** Match date (ISO string or YYYY-MM-DD format) */
    date: string;

    /** Number of goals Ronaldo scored in this match */
    goals: number;

    /** Number of assists Ronaldo made in this match */
    assists: number;
}
