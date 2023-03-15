import { kanjiModel } from './model.js';
import { Kanji, KanjiCreateDTO } from './kanji.js';

export class KanjiStore {
    async getKanji() {
        return await kanjiModel.find();
    }

    async getKanjiById(id: string) {
        return await kanjiModel.findById(id);
    }

    async createKanji(kanji: KanjiCreateDTO) {
        const newKanji = new kanjiModel(kanji);
        return await newKanji.save();
    }
}