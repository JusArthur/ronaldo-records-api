import Joi from "joi";
import { RequestSchema } from "../middleware/validate";

/**
 * @openapi
 * components:
 *   schemas:
 *     Club:
 *       type: object
 *       required:
 *         - name
 *         - seasons
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for a club
 *           example: "PZyY4KR2ljsdlFh92HjR"
 *         name:
 *           type: string
 *           description: The club name
 *           example: "Real Madrid"
 *         seasons:
 *           type: string
 *           description: Seasons played for this club (e.g., 2009–2018)
 *           example: "2009–2018"
 *         goals:
 *           type: number
 *           description: Total goals scored for this club
 *           example: 450
 *         assists:
 *           type: number
 *           description: Total assists made for this club
 *           example: 131
 */

/**
 * Club schema organised by request type
 */
export const clubSchemas: Record<string, RequestSchema> = {
    // POST /api/v1/clubs - Create new club
    create: {
        body: Joi.object({
            name: Joi.string().required().messages({
                "any.required": "Club name is required",
                "string.empty": "Club name cannot be empty",
            }),
            seasons: Joi.string().required().messages({
                "any.required": "Seasons is required",
                "string.empty": "Seasons cannot be empty",
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
