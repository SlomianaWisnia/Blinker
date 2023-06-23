
/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: Log out user when connect.sid cookie is valid
 *     tags: [Log Out]
 *     parameters:
 *       - in: cookie
 *         name: connect.sid
 *         schema:
 *           type: string
 *           required: true
 *     requestBody:
 *       description: User's connect.sid cookie session
 *     responses:
 *        400:
 *          description: No cookie, cookie is expired, cookie is invalid
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *        200:
 *          description: Successfully logged out (session destroyed)
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 */