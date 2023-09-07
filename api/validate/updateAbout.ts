import Joi from 'joi';

const schema = Joi.object().keys({
  about: Joi.object().keys({
    emoji: Joi.string().custom((val:string, helper:any) => {
      if (!(val.match(/./gu).length == 1)) {
        return helper.message('Emoji has to be 1 character long!');
      }
    }).required(),
    bio: Joi.string().min(1).max(256).required(),
  }).required(),
}).unknown(true);

export default (about:{ about: { emoji: string; bio: string; } }) => schema.validate(about);
