/**
 * @swagger
 * /api/auth:
 *   post:
 *     summary: Returns connect.sid cookie when user gives right credentials
 *     tags: [Authentication]
 *     requestBody:
 *       description: User's username or email address and password
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                    type: string
 *                    minLength: 5
 *                    maxLength: 70
 *                    description: Username or email address
 *                    required: true
 *                 password:
 *                    type: string
 *                    minLength: 8
 *                    maxLength: 70
 *                    description: Password
 *                    required: true
 *     responses:
 *        400:
 *          description: Invalid body
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *        500:
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *        200:
 *          description: Successfully logged in (connect.sid cookie has been set properly)
 *          content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 */
