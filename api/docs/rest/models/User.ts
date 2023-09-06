/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - username
 *        - email
 *        - avatarHex
 *        - password
 *      properties:
 *        _id:
 *         type: string
 *         description: User autogenerated ID
 *        username:
 *         type: string
 *         minLength: 5
 *         maxLength: 50
 *         description: Username of the User
 *        email:
 *         type: string
 *         minLength: 5
 *         maxLength: 70
 *         description: Email address of the User
 *        about:
 *         type: object
 *         properties:
 *          emoji:
 *           type: string
 *           length: 1
 *           required: true
 *           description: Emoji for User About
 *          bio:
 *           type: string
 *           minLength: 1
 *           maxLength: 256
 *           required: true
 *           description: Bio for User About
 *        avatar:
 *         type: string
 *         minLength: 5
 *         maxLength: 128
 *         description: Path for User's avatar
 *        avatarHex:
 *         type: string
 *         length: 7
 *         description: Random hex color for User's default avatar
 *        password:
 *         type: string
 *         minLength: 8
 *         maxLength: 1024
 *         description: User's password (maximum length of the `password` is 70 but because of password hashing is set to 1024 in User model)
 *        friends:
 *         type: array
 *         items:
 *           type: string
 *           description: ObjectId of the friend
 *           example: 64830300d29f75fd600c4436
 *         description: Array of User's friends
 *      example:
 *        _id: 6480a22330db01f182b4646f
 *        username: Test1
 *        email: a@vp.pl
 *        about: { emoji: '😋', bio: 'Hello World!' }
 *        avatar: 6480a22330db01f182b4646f.png
 *        password: $2b$15$B4Lr9qSun4U6wgM0865gV.5iFs8mcbDonPQwN4F3BEmWNFcbVocu.
 *        friends: ['64830300d29f75fd600c4436']
 */
