import { ObjectId } from 'mongoose';
import joi from 'joi';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// JOI VALIDATIONS /////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let id = joi.string().regex(/^[0-9a-fA-F]{24}$/);
let word = joi.string().min(1).max(64);
let meaning = joi.array().min(1).unique().items(joi.string().min(1).max(64));
let pronunciation = joi.array().min(1).unique().items(joi.string().min(1).max(64));
let notes = joi.string().allow(null).min(1).max(1024);
let created_at = joi.string().isoDate();

export const WordJoi = joi.object({
    id: id.required(),
    word: word.required(),
    meaning: meaning.required(),
    pronunciation: pronunciation.required(),
    notes: notes.optional(),
    created_at: created_at.required(),
});

export const WordCreateJoi = joi.object({
    word: word.required(),
    meaning: meaning.required(),
    pronunciation: pronunciation.required(),
    notes: notes.optional(),
});

export const WordUpdateJoi = joi.object({
    word: word.optional(),
    meaning: meaning.optional(),
    pronunciation: pronunciation.optional(),
    notes: notes.optional(),
});

// export const IdJoi = joi.object({
//     id: id.required(),
// });

// export const PropsJoi = joi.object({
//     prop: joi.string().valid('meaning', 'pronunciation').required(),
//     values: joi.array().min(1).unique().items(joi.string().min(1).max(64)).required(),
// });

export const WordFilterJoi = joi.object({
    word: word.optional(),
    meaning: joi.string().min(1).max(64).optional(),
    pronunciation: joi.string().min(1).max(64).optional(),
    notes: notes.optional(),
    limit: joi.number().integer().min(1).max(999).optional(),
    skip: joi.number().integer().min(0).optional(),
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////// TYPESCRIPT INTERFACES //////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface Word {
    id: ObjectId;
    word: string;
    meaning: string[];
    pronunciation: string[];
    notes?: string;
    created_at: Date;
}

export interface WordCreateDTO extends Omit<Word, 'id' | 'created_at'> {}

export interface WordUpdateDTO extends Omit<Word, 'id' | 'created_at'> {}