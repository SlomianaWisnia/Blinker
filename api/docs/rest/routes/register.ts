
/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Saves user to the database and returns connect.sid cookie when user provides correct input data
 *     tags: [Register]
 *     requestBody:
 *       description: User's username, email and password
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                    type: string
 *                    minLength: 5
 *                    maxLength: 50
 *                    description: Username
 *                    required: true
 *                 email:
 *                    type: string
 *                    minLength: 5
 *                    maxLength: 70
 *                    description: Email address
 *                    required: true
 *                 password:
 *                    type: string
 *                    minLength: 8
 *                    maxLength: 70
 *                    description: Password
 *                    required: true
 *               example:
 *                 username: TestUser
 *                 email: a@vp.pl
 *                 password: 1234567a
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
 *          description: Successfully registered (user has been saved in the database and connect.sid cookie has been set properly)
 *          content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 */