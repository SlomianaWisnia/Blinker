/**
 * @swagger
 * /api/messages/{id}/{start}/{limit}:
 *   get:
 *     summary: Returns a given range of messages when connect.sid cookie is correct
 *     description: Retrieve chat messages from a chat room
 *     tags: [Get Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the chat room
 *       - in: path
 *         name: start
 *         required: true
 *         schema:
 *           type: number
 *         description: The starting index of the messages
 *       - in: path
 *         name: limit
 *         required: true
 *         schema:
 *           type: number
 *         description: The number of messages to retrieve
 *     responses:
 *       200:
 *         description: Messages successfully returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       from:
 *                         type: object
 *                         properties:
 *                           username:
 *                             type: string
 *                             required: true
 *                           avatar:
 *                             type: string
 *                           avatarHex:
 *                             type: string
 *                             required: true
 *                       message:
 *                         type: string
 *                       source:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                 reachedMax:
 *                   type: boolean
 *               example:
 *                 messages: [{ from: { username: 'Test1', avatar: 'example.png', avatarHex: '#cbcbcb' }, message: 'Hello World!', createdAt: '2023-06-26T16:35:31.538Z' }]
 *                 reachedMax: false
 *       400:
 *         description: Invalid parameters, Chat Room ID or cookie is signed for invalid User
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
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
 */
