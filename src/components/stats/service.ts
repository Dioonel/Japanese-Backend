import { notFound } from '@hapi/boom';
import { formatISO } from 'date-fns';
import { StatsStore } from './store.js';
import { GenericPushHistoryDTO, StatsCreateDTO } from './stats.js';

const store = StatsStore.getInstance();

export class StatsService {
    private static _instance: StatsService;
    private constructor() {}
    static getInstance(): StatsService {
        if (!StatsService._instance) {
            StatsService._instance = new StatsService();
        }
        return StatsService._instance;
    }

    async getStats() {
        // Refactor when user system is implemented
        const stats = await store.getStats();
        return stats;
    }

    async pushGenericHistory(genericHistory: GenericPushHistoryDTO, type: 'guess' | 'pairs') {
        const match = {
            total_correct: genericHistory.total_correct,
            total_incorrect: genericHistory.total_incorrect,
            date: formatISO(new Date(), { representation: 'date' })
        }

        return await store.updateHistory(match, genericHistory.time, type);
    }

    // Re-utilize when user system is implemented
    // async initializeStats(userId) {
    //     const baseStats: StatsCreateDTO = {
    //         user_id: userId,
    //         last_checked: '2024-01-01',
    //         overall: {
    //             total_correct: 0,
    //             total_incorrect: 0,
    //             total_time: 0,
    //         },
    //         guess: {
    //             history: [],
    //             overall: {
    //                 total_correct: 0,
    //                 total_incorrect: 0,
    //                 total_time: 0,
    //                 average_time: 0,
    //             }
    //         },
    //         pairs: {
    //             history: [],
    //             overall: {
    //                 total_correct: 0,
    //                 total_incorrect: 0,
    //                 total_time: 0,
    //                 average_time: 0,
    //             }
    //         }
    //     };

    //     return await store.createStats(baseStats);
    // }
}