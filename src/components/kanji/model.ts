import { Schema, model } from 'mongoose';

const kanjiSchema = new Schema({
    kanji: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 1,
        unique: false,
    },
    meaning: [{
        type: String,
        required: true,
        maxLength: 64,
        minLength: 1,
        unique: false,
    }],
    pronunciation: [{
        type: String,
        required: true,
        maxLength: 64,
        minLength: 1,
        unique: false,
    }],
    notes: {
        type: String,
        required: false,
        maxLength: 1024,
        minLength: 1,
        unique: false,
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true,
    }
});

export const kanjiModel = model('kanji', kanjiSchema);