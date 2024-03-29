import Joi from 'joi';

const schema = Joi.object().keys({
  username: Joi.string().min(5).max(70).required(),
}).unknown(true);

export default (user:{ username: string }) => schema.validate(user);
