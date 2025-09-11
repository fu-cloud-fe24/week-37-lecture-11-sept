import Joi from 'joi';

export const movieSchema = Joi.object({
    title : Joi.string().min(1).required(),
    director : Joi.string().min(4).required(),
    year : Joi.number().integer().min(1888).max(2026).required()
});