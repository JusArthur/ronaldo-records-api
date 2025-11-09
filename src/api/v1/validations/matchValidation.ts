import Joi from "joi";
import { RequestSchema } from "../middleware/validate";

/**
 * @openapi
 * components:
 *   schemas:
 *     Match:
 *       type: object
 *       required:
 *         - opponent
 *         - date
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for a match
 *           example: "G5gRYX36bllXVjaY6ESh"
 *         opponent:
 *           type: string
 *           description: The opponent team name
 *           example: "Barcelona"
 *         date:
 *           type: string
 *           format: date
 *           description: The match date
 *           example: "2025-05-01"
 *         goals:
 *           type: number
 *           description: Number of goals scored
 *           example: 2
 *         assists:
 *           type: number
 *           description: Number of assists made
 *           example: 1
 */

/**
 * Match schema organised by request type
 */
export const matchSchemas: Record<string, RequestSchema> = {
    // POST /api/v1/matches - Create new match
    create: {
        body: Joi.object({
            opponent: Joi.string().required().messages({
                "any.required": "Opponent is required",
                "string.empty": "Opponent cannot be empty",
            }),
            date: Joi.string().required().messages({
                "any.required": "Date is required",
                "string.empty": "Date cannot be empty",
            }),
            goals: Joi.number().optional().min(0).messages({
                "number.min": "Goals cannot be negative",
            }),
            assists: Joi.number().optional().min(0).messages({
                "number.min": "Assists cannot be negative",
            }),
        }),
    },

    // PUT /api/v1/matches/:id - Update existing match
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Match ID is required",
                "string.empty": "Match ID cannot be empty",
            }),
        }),
        body: Joi.object({
            opponent: Joi.string().optional().messages({
                "string.empty": "Opponent cannot be empty",
            }),
            date: Joi.string().optional().messages({
                "string.empty": "Date cannot be empty",
            }),
            goals: Joi.number().optional().min(0).messages({
                "number.min": "Goals cannot be negative",
            }),
            assists: Joi.number().optional().min(0).messages({
                "number.min": "Assists cannot be negative",
            }),
        }),
    },
};
