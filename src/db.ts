import db from 'mongoose';

export async function connect(url){
    try{
        await db.connect(url);
        console.log('db connected');
    } catch (err) {
        console.log('error connecting to db');
    }
}