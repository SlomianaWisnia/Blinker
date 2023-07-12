import Joi from 'joi';

const schema = Joi.object().keys({
  message: Joi.string().min(1).max(512).required()
}).unknown(true);

export default (message:{ message: string }) => schema.validate(message);
