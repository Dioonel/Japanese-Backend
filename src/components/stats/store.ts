import { notFound, internal, badData } from '@hapi/boom';
import { statsModel } from './model.js';
import { GuessPushHistoryDTO, PairsPushHistoryDTO, StatsCreateDTO } from './stats.js';

export class StatsStore {
    private static _instance: StatsStore;
    private constructor() {}
    static getInstance(): StatsStore {
        if (!StatsStore._instance) {
            StatsStore._instance = new StatsStore();
        }
        return StatsStore._instance;
    }

    async getStats() {
        // Refactor when user system is implemented
        return await statsModel.findOne()
        .catch((err) => {
            throw internal(`${err.message}`);
        });
    }

    // Re-utilize when user system is implemented
    // async createStats(stats: StatsCreateDTO) {
    //     const newStats = new statsModel(stats);
    //     return await newStats.save()
    //     .catch((err) => {
    //         if(err.name === 'ValidationError') {
    //             throw badData(`${err.message}`);
    //         } else {
    //             throw internal(`${err.message}`);
    //         }
    //     });
    // }
}