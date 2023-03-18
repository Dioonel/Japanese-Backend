import { notFound, internal, badData } from '@hapi/boom';
import { kanjiModel } from './model.js';
import { Kanji, KanjiCreateDTO, KanjiUpdateDTO } from './kanji.js';

export class KanjiStore {
    async getKanji(filter) {
        return await kanjiModel.find(filter);
    }

    async getKanjiById(id: string) {
        return await kanjiModel.findById(id)
        .catch((err) => {
            if(err.name === 'CastError') {
                throw notFound(`Kanji with id ${id} not found`);
            } else {
                throw internal(`${err.message}`);
            }
        });
    }

    async createKanji(kanji: KanjiCreateDTO) {
        const newKanji = new kanjiModel(kanji);
        return await newKanji.save()
        .catch((err) => {
            if(err.name === 'ValidationError') {
                throw badData(`${err.message}`);
            } else {
                console.log(err);
                throw internal(`${err.message}`);
            }
        });
    }

    async updateKanji(id: string, changes: KanjiUpdateDTO) {
        return await kanjiModel.findByIdAndUpdate(id, changes, { new: true, runValidators: true })
        .catch((err) => {
            if(err.name === 'CastError') {
                throw notFound(`Kanji with id ${id} not found`);
            } else if(err.name === 'ValidationError') {
                throw badData(`${err.message}`);
            } else {
                throw internal(`${err.message}`);
            }
        });
    }

    async deleteKanji(id: string) {
        return await kanjiModel.findByIdAndDelete(id)
        .catch((err) => {
            if(err.name === 'CastError') {
                throw notFound(`Kanji with id ${id} not found`);
            } else {
                throw internal(`${err.message}`);
            }
        });
    }

    async pushProp(id: string, prop: string, values: string[]) {
        return await kanjiModel.findByIdAndUpdate(id, { $addToSet: { [prop]: values } }, { new: true, runValidators: true })
        .catch((err) => {
            if(err.name === 'CastError') {
                throw notFound(`Kanji with id ${id} not found`);
            } else if(err.name === 'ValidationError') {
                throw badData(`${err.message}`);
            } else {
                throw internal(`${err.message}`);
            }
        });
    }

    async pullProp(id: string, prop: string, values: string[]) {
        return await kanjiModel.findByIdAndUpdate(id, { $pull: { [prop]: { $in: values }} }, { new: true, runValidators: true })
        .catch((err) => {
            if(err.name === 'CastError') {
                throw notFound(`Kanji with id ${id} not found`);
            } else if(err.name === 'ValidationError') {
                throw badData(`${err.message}`);
            } else {
                throw internal(`${err.message}`);
            }
        });
    }
}