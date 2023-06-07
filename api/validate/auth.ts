import Joi from 'joi';

const schema = Joi.object().keys({
  username: Joi.string().min(1).max(50).required(),
  password: Joi.string().min(1).max(350).required(),
}).unknown(true);

export default (user:{ username: string, password: string }) => schema.validate(user);
