/**
 * @swagger
 * /api/user/delete-avatar:
 *   delete:
 *     summary: Deletes User Avatar
 *     tags: [Update User]
 *     parameters:
 *       - in: cookie
 *         name: connect.sid
 *         schema:
 *           type: string
 *           required: true
 *     responses:
 *        400:
 *          description: User avatar is not set
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
 *          description: Successfully removed user avatar
 *          content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 */
