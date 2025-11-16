/**
 * Represents a single club record in the Cristiano Ronaldo Records API
 */
export interface Club {
    /** Firestore auto-generated document ID */
    id?: string;

    /** Club name */
    name: string;

    /** Seasons played for the club (e.g., "2003–2009") */
    seasons: string;

    /** Total goals scored for this club */
    goals: number;

    /** Total assists made for this club */
    assists: number;
}