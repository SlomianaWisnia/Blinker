/**
 * @swagger
 * components:
 *  schemas:
 *    ChatRoom:
 *      type: object
 *      required:
 *        - members
 *      properties:
 *        _id:
 *         type: string
 *         description: ChatRoom autogenerated ID
 *        members:
 *          type: array
 *          items:
 *            type: string
 *            description: ObjectId of the member
 *            example: 64830300d29f75fd600c4436
 *          description: Array of Chat members
 *        messages:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Message'
 *      example:
 *        _id: 649424a8f3ca6c564f58c857
 *        members: ['64830309d29f75fd600c443a', '64830300d29f75fd600c4436']
 *        messages: [{ from: '64830309d29f75fd600c443a', message: 'Hello World!', createdAt: '2023-06-22T10:45:50.315Z' }]
 */