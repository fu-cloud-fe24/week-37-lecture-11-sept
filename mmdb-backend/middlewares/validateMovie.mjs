import { movieSchema } from "../models/movieSchema.mjs";

export const validateMovie = () => ({
    before : (handler) => {
        const { error, value } = movieSchema.validate(handler.event.body);
        console.log('Error i middleware:', error);
        console.log('Value i middleware', value);
        if(error) {
            throw new Error(error.details[0].message);
        }
    }
});