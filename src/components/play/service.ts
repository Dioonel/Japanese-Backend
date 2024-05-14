import { internal } from '@hapi/boom';

import { KanjiStore } from './../kanji/store.js';
import { Kanji } from './../kanji/kanji.js';
import { WordStore } from './../words/store.js';
import { Word } from './../words/word.js';
import { StatsService } from './../stats/service.js';
import { GenericPushHistoryDTO } from './../stats/stats.js';

const kanjiStore = KanjiStore.getInstance();
const wordStore = WordStore.getInstance();
const statsService = StatsService.getInstance();

export class PlayService {
    private static _instance: PlayService;
    private constructor() {}
    static getInstance(): PlayService {
        if (!PlayService._instance) {
            PlayService._instance = new PlayService();
        }
        return PlayService._instance;
    }

    async guess(quantity: number) {
        let kanjiCount = await kanjiStore.countKanji();
        let wordCount = await wordStore.countWords();

        if(quantity > kanjiCount + wordCount) {
            throw internal('Not enough kanji and words to guess');
        };

        const randomN = this.randomNumber(2, quantity - 2);
        const kanji: Kanji[] = await kanjiStore.getRandomKanji(randomN);
        const words: Word[] = await wordStore.getRandomWords(quantity - randomN);
        
        const items = this.shuffle([...kanji, ...words]);

        return items;
    }

    async pairs(quantity: number) {
        let kanjiCount = await kanjiStore.countKanji();
        let wordCount = await wordStore.countWords();

        if(quantity > kanjiCount + wordCount) {
            throw internal('Not enough kanji and words to guess');
        };

        const kanji: Kanji[] = await kanjiStore.getRandomKanji(quantity / 2);
        const words: Word[] = await wordStore.getRandomWords(quantity / 2);
        
        const items = this.shuffle([...kanji, ...words]);

        return items;
    }


    randomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }


    shuffle(array: any[]) {
        let currentIndex = array.length, randomIndex;
    
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
    
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
    
        return array;
    }

    async submitScore(userId: string, score: GenericPushHistoryDTO, type: 'guess' | 'pairs') {
        // Should user userId when user system is implemented
        return await statsService.pushGenericHistory(score, type);
    }
}