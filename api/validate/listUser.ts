import Joi from 'joi';

const schema = Joi.object().keys({
  phrase: Joi.string().min(0).max(50).required(),
}).unknown(true);

export default (user:{ phrase: string }) => schema.validate(user);
