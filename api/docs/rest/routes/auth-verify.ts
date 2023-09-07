/**
 * @swagger
 * /api/auth-verify:
 *   post:
 *     summary: Returns user data when connect.sid cookie is correct
 *     tags: [Authorization]
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
 *          description: Successfully verified cookie and returned user data
 *          content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                   data:
 *                     type: object
 *                     properties:
 *                       user:
 *                         type: object
 *                         properties:
 *                           username:
 *                             type: string
 *                             description: Logged user's username
 *                             required: true
 *                           email:
 *                             type: string
 *                             description: Logged user's email
 *                             example: a@vp.pl
 *                             required: true
 *                           about:
 *                             type: object
 *                             properties:
 *                               emoji:
 *                                 type: string
 *                                 minLength: 1
 *                                 maxLength: 1
 *                                 example: '👍'
 *                                 required: true
 *                                 description: Emoji for User About
 *                               bio:
 *                                 type: string
 *                                 minLength: 1
 *                                 maxLength: 256
 *                                 required: true
 *                                 description: Bio for User About
 *                           avatar:
 *                             type: string
 *                             description: Logged user's path for avatar
 *                             example: 6480a22330db01f182b4646f.png
 *                           avatarHex:
 *                             type: string
 *                             length: 7
 *                             description: Random hex color for User's default avatar
 *                             example: '#c1c1c1'
 *                             required: true
 *                       friends:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             username:
 *                               type: string
 *                               description: Friend's username
 *                               required: true
 *                             about:
 *                               type: object
 *                               properties:
 *                                 emoji:
 *                                   type: string
 *                                   minLength: 1
 *                                   maxLength: 1
 *                                   example: '👍'
 *                                   required: true
 *                                   description: Emoji for User About
 *                                 bio:
 *                                   type: string
 *                                   minLength: 1
 *                                   maxLength: 256
 *                                   required: true
 *                                   description: Bio for User About
 *                             avatar:
 *                               type: string
 *                               description: Friend's path for avatar
 *                               example: 64830300d29f75fd600c4436.jpg
 *                             avatarHex:
 *                               type: string
 *                               length: 7
 *                               description: Friend's random hex color for the default avatar
 *                               example: '#efeefe'
 *                               required: true
 */
