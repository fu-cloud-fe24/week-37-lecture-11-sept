import Joi from 'joi';

export const reviewSchema = Joi.object({
    username : Joi.string().alphanum().min(5).required(),
    movieId : Joi.string().alphanum().min(7).max(9).required(),
    rating : Joi.number().min(0).max(10).required(),
    text : Joi.string().required()
});