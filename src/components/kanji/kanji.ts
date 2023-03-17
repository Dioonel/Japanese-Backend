import { ObjectId } from 'mongoose';
import joi from 'joi';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// JOI VALIDATIONS /////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let id = joi.string().regex(/^[0-9a-fA-F]{24}$/);
let kanji = joi.string().min(1).max(1);
let meaning = joi.array().min(1).unique().items(joi.string().min(1).max(64));
let pronunciation = joi.array().min(1).unique().items(joi.string().min(1).max(64));
let notes = joi.string().allow(null).min(1).max(1024);
let created_at = joi.string().isoDate();

export const KanjiJoi = joi.object({
    id: id.required(),
    kanji: kanji.required(),
    meaning: meaning.required(),
    pronunciation: pronunciation.required(),
    notes: notes.optional(),
    created_at: created_at.required(),
});

export const KanjiCreateJoi = joi.object({
    kanji: kanji.required(),
    meaning: meaning.required(),
    pronunciation: pronunciation.required(),
    notes: notes.optional(),
});

export const KanjiUpdateJoi = joi.object({
    kanji: kanji.optional(),
    meaning: meaning.optional(),
    pronunciation: pronunciation.optional(),
    notes: notes.optional(),
});

export const IdJoi = joi.object({
    id: id.required(),
});

export const PropsJoi = joi.object({
    prop: joi.string().valid('meaning', 'pronunciation').required(),
    values: joi.array().min(1).unique().items(joi.string().min(1).max(64)).required(),
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////// TYPESCRIPT INTERFACES //////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface Kanji {
    id: ObjectId;
    kanji: string;
    meaning: string[];
    pronunciation: string[];
    notes?: string;
    created_at: Date;
}

export interface KanjiCreateDTO extends Omit<Kanji, 'id' | 'created_at'> {}

export interface KanjiUpdateDTO extends Omit<Kanji, 'id' | 'created_at'> {}