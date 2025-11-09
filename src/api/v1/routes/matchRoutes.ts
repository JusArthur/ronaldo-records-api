import express, { Router } from "express";
import * as matchController from "../controllers/matchController.js";
import { validateRequest } from "../middleware/validate";
import { matchSchemas } from "../validations/matchValidation";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import { AuthorizationOptions } from "../models/authorizationOptions";

const router: Router = express.Router();

// "/api/v1/matches" prefixes all below routes

/**
 * @openapi
 * /matches:
 *   get:
 *     summary: Retrieves a list of matches
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of Matches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Match'
 *
 */
router.get("/", 
    authenticate,
    isAuthorized({ hasRole: ["admin"], allowSameUser: true } as AuthorizationOptions),
    matchController.getAllMatches);

// sequential order authenticate -> isAuthorized -> validateRequest -> createMatch

/**
 * @openapi
 * /matches:
 *   post:
 *     summary: Create a new match record
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - opponent
 *               - date
 *               - goals
 *               - assists
 *             properties:
 *               opponent:
 *                 type: string
 *                 example: "Barcelona"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2024-04-18"
 *               goals:
 *                 type: number
 *                 example: 2
 *               assists:
 *                 type: number
 *                 example: 1
 *               hatTrick:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Match created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Match'
 *       400:
 *         description: Invalid input data
 */
router.post(
    "/",
    authenticate,
    isAuthorized({ hasRole: ["user"] } as AuthorizationOptions),
    validateRequest(matchSchemas.create),
    matchController.createMatch
);

/**
 * @openapi
 * /matches/{id}:
 *   get:
 *     summary: Retrieves a list of matches
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of Matches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Match'
 */
router.get(
    "/:id",
    authenticate,
    isAuthorized({
        hasRole: ["admin"],
        allowSameUser: true,
    } as AuthorizationOptions),
    matchController.getMatchById
)

/**
 * @openapi
 * /matches/{id}:
 *   put:
 *     summary: Update an existing match record
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Match document ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Match'
 *     responses:
 *       200:
 *         description: Match updated successfully
 *       404:
 *         description: Match not found
 */
router.put(
    "/:id",
    authenticate,
    isAuthorized({
        hasRole: ["admin"],
        allowSameUser: true,
    } as AuthorizationOptions),
    validateRequest(matchSchemas.update),
    matchController.updateMatch
);

/**
 * @openapi
 * /matches/{id}:
 *   delete:
 *     summary: Delete a match record
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Match document ID
 *     responses:
 *       200:
 *         description: Match deleted successfully
 *       404:
 *         description: Match not found
 */
router.delete(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin"] } as AuthorizationOptions),
    matchController.deleteMatch
);

export default router;