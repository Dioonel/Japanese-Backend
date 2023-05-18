import { notFound, internal, badData } from '@hapi/boom';

import { wordModel } from './model.js';
import { WordCreateDTO, WordUpdateDTO } from './word.js';

export class WordStore {
    private static _instance: WordStore;
    private constructor() {}
    static getInstance(): WordStore {
        if (!WordStore._instance) {
            WordStore._instance = new WordStore();
        }
        return WordStore._instance;
    }

    async getWords(filter, paginate) {
        return await wordModel.find(filter)
        .limit(paginate?.limit || null)
        .skip((paginate?.limit || 1) * paginate?.skip || 0)
        .catch((err) => {
            throw internal(`${err.message}`);
        });
    }

    async getWordById(id: string) {
        return await wordModel.findById(id)
        .catch((err) => {
            if(err.name === 'CastError') {
                throw notFound(`Word with id ${id} not found`);
            } else {
                throw internal(`${err.message}`);
            }
        });
    }

    async createWord(word: WordCreateDTO) {
        const newWord = new wordModel(word);
        return await newWord.save()
        .catch((err) => {
            if(err.name === 'ValidationError') {
                throw badData(`${err.message}`);
            } else {
                throw internal(`${err.message}`);
            }
        });
    }

    async updateWord(id: string, changes: WordUpdateDTO) {
        return await wordModel.findByIdAndUpdate(id, changes, { new: true, runValidators: true })
        .catch((err) => {
            if(err.name === 'CastError') {
                throw notFound(`Word with id ${id} not found`);
            } else if(err.name === 'ValidationError') {
                throw badData(`${err.message}`);
            } else {
                throw internal(`${err.message}`);
            }
        });
    }

    async deleteWord(id: string) {
        return await wordModel.findByIdAndDelete(id)
        .catch((err) => {
            if(err.name === 'CastError') {
                throw notFound(`Word with id ${id} not found`);
            } else {
                throw internal(`${err.message}`);
            }
        });
    }

}