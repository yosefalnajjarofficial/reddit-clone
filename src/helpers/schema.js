const Joi = require('@hapi/joi');

exports.schema = Joi.object().keys({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{8,}$/)
    .required(),
  confrimPassword: Joi.any()
    .valid(Joi.ref('password'))
    .required(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  bio: Joi.string(),
});
