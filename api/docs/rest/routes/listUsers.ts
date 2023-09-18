/**
 * @swagger
 * /api/list-users:
 *   get:
 *     summary: Returns all Users who username includes the given phrase
 *     tags: [Get Users]
 *     requestBody:
 *       description: Part of username for searching
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 phrase:
 *                    type: string
 *                    minLength: 0
 *                    maxLength: 70
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
 *          description: Successfully returned users
 *          content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   users:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         username:
 *                           type: string
 *                           minLength: 5
 *                           maxLength: 50
 *                           description: Member's username
 *                           example: Test1
 *                           required: true
 *                         about:
 *                           type: object
 *                           properties:
 *                             emoji:
 *                               type: string
 *                               minLength: 1
 *                               maxLength: 1
 *                               example: '👍'
 *                               required: true
 *                               description: Emoji for User About
 *                             bio:
 *                               type: string
 *                               minLength: 1
 *                               maxLength: 256
 *                               required: true
 *                               description: Bio for User About
 *                         avatar:
 *                           type: string
 *                           minLength: 5
 *                           maxLength: 128
 *                           example: 64830300d29f75fd600c4436.jpg
 *                           description: Path for member's avatar
 *                         avatarHex:
 *                           type: string
 *                           length: 7
 *                           example: '#333333'
 *                           description: Member's random hex color for the default avatar
 *                           required: true
 *                       description: Array of fetched Users
 *                       required: true
 */
