import { notFound } from '@hapi/boom';

import { WordStore } from './store.js';
import { WordCreateDTO, WordUpdateDTO } from './word.js';

const store = new WordStore();

export class WordService {
    async getWords() {
        return await store.getWords();
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