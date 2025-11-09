/**
 * Award Model that represents an award received by CR7
 */
export interface Award {
    /** Firestore auto-generated document ID */
    id?: string;

    /** Name of the award */
    name: string;

    /** Year the award was received */
    year: number;
}