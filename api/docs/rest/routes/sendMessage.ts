/**
 * @swagger
 * /send-message/{id}:
 *   put:
 *     tags: [Send Message]
 *     summary: Send a message or upload media in a chat room
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the chat room
 *         required: true
 *         type: string
 *       - in: cookie
 *         name: connect.sid
 *         schema:
 *           type: string
 *           required: true
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 512
 *                 description: Text message to send (required and allowed only when `media` is not set)
 *               media:
 *                 type: string
 *                 format: binary
 *                 description: Media file to upload (required and allowed only when `message` is not set) [max. 7MB]
 *     responses:
 *       200:
 *         description: Message successfully sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Cookie is signed for invalid user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 *       401:
 *         description: No cookie, cookie is expired, cookie is invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 */
