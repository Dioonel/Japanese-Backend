import joi from 'joi';

let quantityGuess = joi.number().valid(5, 10, 15, 20).required();
let quantityPairs = joi.number().valid(10, 20, 30, 40).required();

export const GuessJoi = joi.object({
    quantity: quantityGuess,
});

export const PairsJoi = joi.object({
    quantity: quantityPairs,
});