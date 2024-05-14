import { Schema, model } from 'mongoose';

const statsSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        unique: true,
    },
    last_checked: {
        type: String,
        required: true,
    },
    overall: {
        total_correct: {
            type: Number,
            required: true,
            default: 0
        },
        total_incorrect: {
            type: Number,
            required: true,
            default: 0
        },
        total_time: {
            type: Number,
            required: true,
            default: 0
        },
    },
    guess: {
        history: [{
            total_correct: {
                type: Number,
                required: true,
                default: 0
            },
            total_incorrect: {
                type: Number,
                required: true,
                default: 0
            },
            date: {
                type: String,
                required: true,
                unique: true,
            },
        }],
        overall: {
            total_correct: {
                type: Number,
                required: true,
                default: 0
            },
            total_incorrect: {
                type: Number,
                required: true,
                default: 0
            },
            total_time: {
                type: Number,
                required: true,
                default: 0
            },
            average_time: {
                type: Number,
                required: true,
                default: 0
            },
        },
    },
    pairs: {
        history: [{
            total_correct: {
                type: Number,
                required: true,
                default: 0
            },
            total_incorrect: {
                type: Number,
                required: true,
                default: 0
            },
            date: {
                type: String,
                required: true,
                unique: true,
            },
        }],
        overall: {
            total_correct: {
                type: Number,
                required: true,
                default: 0
            },
            total_incorrect: {
                type: Number,
                required: true,
                default: 0
            },
            total_time: {
                type: Number,
                required: true,
                default: 0
            },
            average_time: {
                type: Number,
                required: true,
                default: 0
            },
        },
    }
});

export const statsModel = model('stats', statsSchema);