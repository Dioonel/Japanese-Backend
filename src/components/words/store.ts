import { notFound, internal, badData } from '@hapi/boom';

import { wordModel } from './model.js';
import { WordCreateDTO, WordUpdateDTO } from './word.js';

export class WordStore {
    async getWords(filter) {
        return await wordModel.find(filter);
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
                console.log(err);
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

    async pushProp(id: string, prop: string, values: string[]) {
        return await wordModel.findByIdAndUpdate(id, { $addToSet: { [prop]: values } }, { new: true, runValidators: true })
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

    async pullProp(id: string, prop: string, values: string[]) {
        return await wordModel.findByIdAndUpdate(id, { $pull: { [prop]: { $in: values }} }, { new: true, runValidators: true })
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
}