import joi from 'joi';

export const IdJoi = joi.object({
    id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
});

export const PropsJoi = joi.object({
    prop: joi.string().valid('meaning', 'pronunciation').required(),
    values: joi.array().min(1).unique().items(joi.string().min(1).max(64)).required(),
});