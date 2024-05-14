import { notFound } from '@hapi/boom';
import { StatsStore } from './store.js';
import { GuessPushHistoryDTO, PairsPushHistoryDTO, StatsCreateDTO } from './stats.js';

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
        const stats = await store.getStats();
        if (!stats) {
            throw notFound('Stats not found');
        }
        return stats;
    }

    // Re-utilize when user system is implemented
    // async initializeStats(userId) {
    //     const baseStats: StatsCreateDTO = {
    //         user_id: userId,
    //         overall: {
    //             total_correct: 0,
    //             total_incorrect: 0,
    //             current_streak: 0,
    //             longest_streak: 0,
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