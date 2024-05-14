import { notFound, internal, badData } from '@hapi/boom';
import { formatISO, differenceInDays } from 'date-fns';

import { statsModel } from './model.js';
import { GenericPushHistoryDTO, StatsCreateDTO } from './stats.js';

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
        const stats = await statsModel.findOne()
        .catch((err) => {
            throw internal(`${err.message}`);
        });

        const today = formatISO(new Date(), { representation: 'date' });
        if(stats.last_checked !== today) {
            // Pop history if it's older than 28 days
            for(let i = 0; i < stats.guess.history.length; i++) {
                const days = differenceInDays(new Date(), new Date(stats.guess.history[i].date));
                if(days >= 28) {
                    stats.guess.history.shift();
                } else {
                    break;
                }
            }

            for(let i = 0; i < stats.pairs.history.length; i++) {
                const days = differenceInDays(new Date(), new Date(stats.pairs.history[i].date));
                if(days > 28) {
                    stats.pairs.history.shift();
                } else {
                    break;
                }
            }

            stats.last_checked = today;

            stats.save()
            .catch((err) => {
                throw internal(`${err.message}`);
            });
            return stats;
        } else {
            return stats;
        }
    }

    async updateHistory(history, time: number, type: 'guess' | 'pairs') {
        const stats = await statsModel.findOne()
        .catch((err) => {
            throw internal(`${err.message}`);
        });

        const lastIndex = stats[type].history.length - 1;

        // Check if should push new history or update existing
        if(stats[type].history[lastIndex]?.date !== history.date || stats[type].history.length === 0) {
            stats[type].history.push(history);
        } else {
            stats[type].history[lastIndex].total_correct += history.total_correct;
            stats[type].history[lastIndex].total_incorrect += history.total_incorrect;
        }

        // Should try to use virtual properties to calculate these values
        stats[type].overall.total_correct += history.total_correct;
        stats[type].overall.total_incorrect += history.total_incorrect;
        stats[type].overall.total_time += time;
        stats[type].overall.average_time = Number((stats[type].overall.total_time / (stats[type].overall.total_correct + stats[type].overall.total_incorrect)).toFixed(2));

        stats.overall.total_correct += history.total_correct;
        stats.overall.total_incorrect += history.total_incorrect;
        stats.overall.total_time += time;

        const updatedStats = await stats.save()
        .catch((err) => {
            throw internal(`${err.message}`);
        });

        return updatedStats;
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