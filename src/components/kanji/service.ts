import { notFound } from '@hapi/boom';
import { KanjiStore } from './store.js';
import { Kanji, KanjiCreateDTO, KanjiUpdateDTO } from './kanji.js';
import { isEmpty } from '../../shared/helpers.js';

const store = new KanjiStore();

export class KanjiService {
    async getKanji(query = null) {
        let filter = null;
        if(!isEmpty(query) && query !== null){
            filter = {};
            if(query?.kanji) filter = {...filter, kanji: {$regex: query.kanji || '', $options: 'i'}};
            if(query?.meaning) filter = {...filter, meaning: {$regex: query.meaning || '', $options: 'i'}};
            if(query?.pronunciation) filter = {...filter, pronunciation: {$regex: query.pronunciation || '', $options: 'i'}};
            if(query?.notes) filter = {...filter, notes: {$regex: query.notes || '', $options: 'i'}};
        }
        return await store.getKanji(filter);
    }

    async getKanjiById(id: string) {
        const kanji = await store.getKanjiById(id);
        if (!kanji) {
            throw notFound(`Kanji with id ${id} not found`);
        }
        return kanji;
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

    async pushProp(id: string, obj: any) {
        return await store.pushProp(id, obj.prop, obj.values);
    }

    async pullProp(id: string, obj: any) {
        return await store.pullProp(id, obj.prop, obj.values);
    }
}