import { userSchema } from "../models/userSchema.mjs";

export const validateUser = () => ({
    before : (handler) => {
        const { error, value } = userSchema.validate(handler.event.body);
        console.log('Error i middleware:', error);
        console.log('Value i middleware', value);
        if(error) {
            throw new Error(error.details[0].message);
        }
    }
});