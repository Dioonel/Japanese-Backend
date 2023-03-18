import { notFound } from '@hapi/boom';
import { WordStore } from './store.js';
import { WordCreateDTO, WordUpdateDTO } from './word.js';
import { isEmpty } from '../../shared/helpers.js';

const store = new WordStore();

export class WordService {
    async getWords(query = null) {
        let filter = null;
        if(!isEmpty(query) && query !== null){
            filter = {};
            if(query?.word) filter = {...filter, word: {$regex: query.word || '', $options: 'i'}};
            if(query?.meaning) filter = {...filter, meaning: {$regex: query.meaning || '', $options: 'i'}};
            if(query?.pronunciation) filter = {...filter, pronunciation: {$regex: query.pronunciation || '', $options: 'i'}};
            if(query?.notes) filter = {...filter, notes: {$regex: query.notes || '', $options: 'i'}};
        }
        return await store.getWords(filter);
    }

    async getWordById(id: string) {
        const word = await store.getWordById(id);
        if (!word) {
            throw notFound(`Word with id ${id} not found`);
        }
        return word;
    }

    async createWord(word: WordCreateDTO) {
        return await store.createWord(word);
    }

    async updateWord(id: string, changes: WordUpdateDTO) {
        return await store.updateWord(id, changes);
    }

    async deleteWord(id: string) {
        return await store.deleteWord(id);
    }

    async pushProp(id: string, obj: any) {
        return await store.pushProp(id, obj.prop, obj.values);
    }

    async pullProp(id: string, obj: any) {
        return await store.pullProp(id, obj.prop, obj.values);
    }
}