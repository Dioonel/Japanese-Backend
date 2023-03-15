import { ObjectId } from 'mongoose';

export interface Kanji {
    id: ObjectId;
    kanji: string;
    meaning: string[];
    pronunciation: string[];
    notes?: string;
    created_at: Date;
}

export interface KanjiCreateDTO extends Omit<Kanji, 'id' | 'created_at'> {}