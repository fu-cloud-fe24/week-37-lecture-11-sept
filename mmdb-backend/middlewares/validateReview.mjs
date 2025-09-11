import { reviewSchema } from "../models/reviewSchema.mjs";

export const validateReview = () => ({
    before : (handler) => {
        const { error, value } = reviewSchema.validate(handler.event.body);
        console.log('Error i middleware:', error);
        console.log('Value i middleware', value);
        if(error) {
            throw new Error(error.details[0].message);
        }
    }
});