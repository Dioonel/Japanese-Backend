import joi from 'joi';

let quantity = joi.number().valid(5, 10, 15, 20).required();

export const GuessJoi = joi.object({
    quantity: quantity,
});