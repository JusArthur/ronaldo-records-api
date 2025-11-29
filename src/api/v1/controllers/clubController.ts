import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../constants/httpConstants";
import * as clubService from "../services/clubService";
import { Club } from "../models/clubModel";
import { successResponse } from "../models/responseModel";

/**
 * Handles requests and responses to retrieve all club records
 * @param req - express Request
 * @param res - express Response
 * @param next - express middleware chaining function
 */
export const getAllClubs = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const clubs: Club[] = await clubService.getAllClubs();
        res.status(HTTP_STATUS.OK).json(
            successResponse(clubs, "Clubs successfully retrieved")
        );
    }
    catch (error: unknown) {
        next(error);
    }
}

/**
 * Handles requests, response to retrieve a club record by ID
 * @param req - express Request
 * @param res - express Response
 * @param next - express middleware chaining function
 */
export const getClubById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id }: { id?: string } = req.params;
        const club: Club | null = await clubService.getClubById(id as string);

        if (!club) {
            res.status(HTTP_STATUS.NOT_FOUND).json(
                successResponse(null, "Club not found")
            );
            return;
        }

        res.status(HTTP_STATUS.OK).json(
            successResponse(club, "Club successfully retrieved")
        );
    } catch (error: unknown) {
        next(error);
    }
}


/**
 * Handles requests, responses, and validation to create a new club record
 * @param req - express Request
 * @param res - express Response
 * @param next - express middleware chaining function
 */
export const createClub = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const clubData: Omit<Club, "id"> = req.body as Omit<Club, "id">;
        const newClub: Club = await clubService.createClub(clubData);
        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newClub, "Club successfully created")
        );
    } catch (error: unknown) {
        next(error);
    }
}

/**
 * Handles requests and responses to update an existing club record
 * @param req - express Request
 * @param res - express Response
 * @param next - express middleware chaining function
 */
export const updateClub = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // --- DEBUG: Log the status of req.body ---
        console.log("DEBUG: Request Body Status:", req.body);
        
        // Defensive check to immediately return a clean error if body is missing
        if (!req.body) {
            console.error("ERROR: Request body is undefined. Check Content-Type header or middleware order.");
            res.status(HTTP_STATUS.BAD_REQUEST).json(
                successResponse(null, "Invalid request body: Body is empty or Content-Type is missing.")
            );
            return;
        }

        const { id }: { id?: string } = req.params;
        const clubData: Partial<Club> = req.body as Partial<Club>;

        const updatedClub: Club = await clubService.updateClub(id as string, clubData);

        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedClub, "Club updated successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Handles requests and responses to delete a club record
 * @param req - express Request
 * @param res - express Response
 * @param next - express middleware chaining function
 */
export const deleteClub = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id }: { id?: string } = req.params;
        await clubService.deleteClub(id as string);

        res.status(HTTP_STATUS.OK).json(
            successResponse(null, "Club successfully deleted")
        );
    } catch (error: unknown) {
        next(error);
    }
};