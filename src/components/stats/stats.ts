import { ObjectId } from 'mongoose';
import joi from 'joi';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// JOI VALIDATIONS /////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// id and user_id are not being used right now, but they will be used when user system is implemented
let id = joi.string().regex(/^[0-9a-fA-F]{24}$/);
let user_id = joi.string().regex(/^[0-9a-fA-F]{24}$/);

// only fields coming from client, everything else is calculated on the server
let total_correct = joi.number().integer().min(0);
let total_incorrect = joi.number().integer().min(0);
let total_time = joi.number().integer().min(0);
let type = joi.string().valid('guess', 'pairs');

const ScoreJoi = joi.object({
    total_correct: total_correct.required(),
    total_incorrect: total_incorrect.required(),
    time: total_time.required(),
});

export const ScoreSubmitJoi = joi.object({
    score: ScoreJoi.required(),
    type: type.required(),
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////// TYPESCRIPT INTERFACES //////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface Stats {
    _id: ObjectId | string;
    user_id: ObjectId | string;
    overall: OverallStats;
    guess: GuessStats;
    pairs: PairsStats;
}

export interface OverallStats {
    total_correct: number;
    total_incorrect: number;
    total_time: number;
}

export interface GuessStats {
    history: History[];
    overall: OverallWithAvg;
}

export interface PairsStats {
    history: History[];
    overall: OverallWithAvg;
}

interface History {
    total_correct: number;
    total_incorrect: number;
    date: string;
}

interface OverallWithAvg extends OverallStats {
    average_time: number;
}

export interface StatsCreateDTO extends Omit<Stats, '_id'> {}

export interface GenericPushHistoryDTO extends Omit<History, 'date'> {
    time: number;
}