import { notFound } from '@hapi/boom';
import { WordStore } from './store.js';
import { WordCreateDTO, WordUpdateDTO } from './word.js';
import { isEmpty } from '../../shared/helpers.js';

const store = WordStore.getInstance();

export class WordService {
    private static _instance: WordService;
    private constructor() {}
    static getInstance(): WordService {
        if (!WordService._instance) {
            WordService._instance = new WordService();
        }
        return WordService._instance;
    }

    async getWords(query = null) {
        let filter = null;
        let paginate = {};
        if(!isEmpty(query) && query !== null){
            filter = {};
            if(query?.word) filter = {...filter, word: {$regex: query.word || '', $options: 'i'}};
            if(query?.meaning) filter = {...filter, meaning: {$regex: query.meaning || '', $options: 'i'}};
            if(query?.pronunciation) filter = {...filter, pronunciation: {$regex: query.pronunciation || '', $options: 'i'}};
            if(query?.notes) filter = {...filter, notes: {$regex: query.notes || '', $options: 'i'}};
            if(query?.limit) paginate = {...paginate, limit: Number(query.limit)};
            if(query?.skip) paginate = {...paginate, skip: Number(query.skip)};
        }
        return await store.getWords(filter, paginate);
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
}