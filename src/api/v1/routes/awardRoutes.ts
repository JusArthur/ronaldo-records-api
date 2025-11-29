import express, { Router } from "express";
import * as awardController from "../controllers/awardController";
import { validateRequest } from "../middleware/validate";
import { awardSchemas } from "../validations/awardValidation";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import { AuthorizationOptions } from "../models/authorizationOptions";

const router: Router = express.Router();

// "/api/v1/awards" prefixes all below routes

/**
 * @openapi
 * /awards:
 *   get:
 *     summary: Retrieves a list of awards
 *     tags: [Awards]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of Awards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Award'
 */
router.get(
  "/",
  authenticate,
  isAuthorized({
    hasRole: ["admin"],
    allowSameUser: true,
  } as AuthorizationOptions),
  awardController.getAllAwards
);

/**
 * @openapi
 * /awards:
 *   post:
 *     summary: Create a new award
 *     tags: [Awards]
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
 *               - year
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ballon d'Or"
 *               year:
 *                 type: number
 *                 example: 2018
 *     responses:
 *       201:
 *         description: Award created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Award'
 *       400:
 *         description: Invalid input data
 */
router.post(
  "/",
  authenticate,
  isAuthorized({ hasRole: ["user"] } as AuthorizationOptions),
  validateRequest(awardSchemas.create),
  awardController.createAward
);

/**
 * @openapi
 * /awards/{id}:
 *   get:
 *     summary: Retrieves an award by ID
 *     tags: [Awards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Award document ID
 *     responses:
 *       200:
 *         description: Award retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Award'
 *       404:
 *         description: Award not found
 */
router.get(
  "/:id",
  authenticate,
  isAuthorized({
    hasRole: ["admin"],
    allowSameUser: true,
  } as AuthorizationOptions),
  awardController.getAwardById
);

/**
 * @openapi
 * /awards/{id}:
 *   put:
 *     summary: Update an existing award record
 *     tags: [Awards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Award document ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Award'
 *     responses:
 *       200:
 *         description: Award updated successfully
 *       404:
 *         description: Award not found
 */
router.put(
  "/:id",
  authenticate,
  isAuthorized({
    hasRole: ["admin"],
    allowSameUser: true,
  } as AuthorizationOptions),
  validateRequest(awardSchemas.update),
  awardController.updateAward
);

/**
 * @openapi
 * /awards/{id}:
 *   delete:
 *     summary: Delete an award record
 *     tags: [Awards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Award document ID
 *     responses:
 *       200:
 *         description: Award deleted successfully
 *       404:
 *         description: Award not found
 */
router.delete(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin"] } as AuthorizationOptions),
  awardController.deleteAward
);

export default router;
