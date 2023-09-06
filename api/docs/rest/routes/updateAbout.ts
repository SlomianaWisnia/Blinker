/**
 * @swagger
 * /api/update-about:
 *   put:
 *     summary: Updates User About
 *     tags: [Update User]
 *     parameters:
 *       - in: cookie
 *         name: connect.sid
 *         schema:
 *           type: string
 *           required: true
 *     requestBody:
 *       description: User's new About
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               about:
 *                type: object
 *                required: true
 *                properties:
 *                 emoji:
 *                  type: string
 *                  minLength: 1
 *                  maxLength: 1
 *                  example: 👍
 *                  required: true
 *                  description: User's new Emoji
 *                 bio:
 *                  type: string
 *                  minLength: 1
 *                  maxLength: 256
 *                  required: true
 *                  description: User's new Bio
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
 *        401:
 *          description: No cookie, cookie is expired, cookie is invalid
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
 *          description: Successfully updated about section
 *          content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 */
