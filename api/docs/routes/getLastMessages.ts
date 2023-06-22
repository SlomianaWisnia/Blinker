/**
 * @swagger
 * /api/get-last-messages:
 *   get:
 *     summary: Returns user data when connect.sid cookie is correct
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
 *        200:
 *          description: Successfully verified cookie and returned user data
 *          content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   chats:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: ChatRoom autogenerated ID
 *                           example: 649424a8f3ca6c564f58c857
 *                         members:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               username:
 *                                 type: string
 *                                 minLength: 5
 *                                 maxLength: 50
 *                                 description: Member's username
 *                                 example: Test1
 *                                 required: true
 *                               avatar:
 *                                 type: string
 *                                 minLength: 5
 *                                 maxLength: 128
 *                                 example: 64830300d29f75fd600c4436.jpg
 *                                 description: Path for member's avatar
 *                           description: Array of Chat members
 *                           required: true
 *                         messages:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                                 description: Message autogenerated ID
 *                               from:
 *                                 type: object
 *                                 properties:
 *                                   username:
 *                                     type: string
 *                                     minLength: 5
 *                                     maxLength: 50
 *                                     description: Sender's username
 *                                     required: true
 *                                   avatar:
 *                                     type: string
 *                                     minLength: 5
 *                                     maxLength: 128
 *                                     example: 64830300d29f75fd600c4436.jpg
 *                                     description: Path for senders's avatar
 *                               source:
 *                                 type: string
 *                                 minLength: 5
 *                                 maxLength: 128
 *                                 description: Path for message media (required and allowed only when `message` field is not set)
 *                               message:
 *                                 type: string
 *                                 minLength: 1
 *                                 maxLength: 512
 *                                 description: Text message (required and allowed only when `source` is not set)
 *                               created:
 *                                 type: string
 *                                 format: date-time
 *                                 description: Date of message sending
 *                           description: Array of messages
 *                           example:
 *                             _id: 64830300d29f75fd600c4436
 *                             from: {
 *                               username: Test1,
 *                               avatar: 64830300d29f75fd600c4436.jpg
 *                             }
 *                             message: Hello World!
 *                             created: 2023-06-22T14:47:51.630Z
 */
