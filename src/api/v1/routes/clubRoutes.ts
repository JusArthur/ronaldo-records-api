import express, { Router } from "express";
import * as clubController from "../controllers/clubController";
import { validateRequest } from "../middleware/validate";
import { clubSchemas } from "../validations/clubValidation";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import { AuthorizationOptions } from "../models/authorizationOptions";

const router: Router = express.Router();

// "/api/v1/clubs" prefixes all below routes

/**
 * @openapi
 * /clubs:
 *   get:
 *     summary: Retrieves a list of clubs
 *     tags: [Clubs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of Clubs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Club'
 *
 */
router.get("/", 
    authenticate,
    isAuthorized({ hasRole: ["admin"], allowSameUser: true } as AuthorizationOptions),
    clubController.getAllClubs);

/**
 * @openapi
 * /clubs:
 *   post:
 *     summary: Create a new club record
 *     tags: [Clubs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - season
 *               - goals
 *               - assists
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Manchester United"
 *               seasons:
 *                 type: string
 *                 example: "2003-2009"
 *               goals:
 *                 type: number
 *                 example: 145
 *               assists:
 *                 type: number
 *                 example: 37
 *     responses:
 *       201:
 *         description: Club created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Club'
 *       400:
 *         description: Invalid input data
 */
router.post(
    "/",
    authenticate,
    isAuthorized({ hasRole: ["user"] } as AuthorizationOptions),
    validateRequest(clubSchemas.create),
    clubController.createClub
);

export default router;