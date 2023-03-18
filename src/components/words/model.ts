import { Schema, model } from 'mongoose';

const wordSchema = new Schema({
    word: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 64,
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

export const wordModel = model('word', wordSchema);