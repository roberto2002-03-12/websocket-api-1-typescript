import Joi from "joi";

const userName = Joi.string().max(45);
const password = Joi.string();
const lastName = Joi.string();
const firstName = Joi.string();
const typeUser = Joi.string().valid('consumer', 'support');

const registerUserSchema = Joi.object({
  userName: userName.required(),
  password: password.required(),
  lastName: lastName.required(),
  firstName: firstName.required(),
  typeUser: typeUser.required()
});

export {
  registerUserSchema
}