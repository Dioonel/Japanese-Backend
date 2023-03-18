import { Model } from 'mongoose';
import { badData, internal, notFound } from '@hapi/boom';

export class SharedService {
    private static _instance: SharedService;
    private constructor() {}
    static getInstance(): SharedService {
        if (!SharedService._instance) {
            SharedService._instance = new SharedService();
        }
        return SharedService._instance;
    }

    public async pushProp(model: Model<any>, id: string, prop: string, values: string[]) {
        return await model.findByIdAndUpdate(id, { $addToSet: { [prop]: values } }, { new: true, runValidators: true })
        .catch((err) => {
            if(err.name === 'CastError') {
                throw notFound(`Word with id ${id} not found`);
            } else if(err.name === 'ValidationError') {
                throw badData(`${err.message}`);
            } else {
                throw internal(`${err.message}`);
            }
        });
    }

    public async pullProp(model: Model<any>, id: string, prop: string, values: string[]) {
        return await model.findByIdAndUpdate(id, { $pull: { [prop]: { $in: values }} }, { new: true, runValidators: true })
        .catch((err) => {
            if(err.name === 'CastError') {
                throw notFound(`Word with id ${id} not found`);
            } else if(err.name === 'ValidationError') {
                throw badData(`${err.message}`);
            } else {
                throw internal(`${err.message}`);
            }
        });
    }
}