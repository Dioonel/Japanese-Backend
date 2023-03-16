// import { ObjectId } from 'mongoose';
import { KanjiStore } from './store.js';
import { Kanji, KanjiCreateDTO, KanjiUpdateDTO } from './kanji.js';

const store = new KanjiStore();

export class KanjiService {
    async getKanji() {
        return await store.getKanji();
    }

    async getKanjiById(id: string) {
        return await store.getKanjiById(id);
    }

    async createKanji(kanji: KanjiCreateDTO) {
        return await store.createKanji(kanji);
    }

    async updateKanji(id: string, changes: KanjiUpdateDTO) {
        return await store.updateKanji(id, changes);
    }

    async deleteKanji(id: string) {
        return await store.deleteKanji(id);
    }
}