/**
 * @swagger
 * /api/get-chat-media/:id/:source:
 *   get:
 *     summary: Returns Message source files is User is logged in
 *     tags: [Get Messages]
 *     parameters:
 *       - in: cookie
 *         name: connect.sid
 *         schema:
 *           type: string
 *           required: true
 *     requestBody:
 *       description: User's connect.sid cookie session
 *     responses:
 *        401:
 *          description: No cookie, cookie is expired, cookie is invalid
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *        400:
 *          description: Cookie is signed for invalid user
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *        404:
 *          description: File not found
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
 *          description: File has been successfully sent
 *          content:
 *            image/jpg:
 *              schema:
 *                type: string
 *                format: binary
 *            image/jpeg:
 *              schema:
 *                type: string
 *                format: binary
 *            image/png:
 *              schema:
 *                type: string
 *                format: binary
 *            image/gif:
 *              schema:
 *                type: string
 *                format: binary
 *            video/mp4:
 *              schema:
 *                type: string
 *                format: binary
 *            video/avi:
 *              schema:
 *                type: string
 *                format: binary
 *            video/mov:
 *              schema:
 *                type: string
 *                format: binary
 *            audio/mp3:
 *              schema:
 *                type: string
 *                format: binary
 *            audio/ogg:
 *              schema:
 *                type: string
 *                format: binary
 *            audio/wave:
 *              schema:
 *                type: string
 *                format: binary
 *            application/pdf:
 *              schema:
 *                type: string
 *                format: binary
 */
