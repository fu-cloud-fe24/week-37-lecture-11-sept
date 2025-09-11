import { client } from './client.mjs';
import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import { generateId } from '../utils/uuid.mjs';

export const addMovie = async (movie) => {
    const command = new PutItemCommand({
        TableName : 'mmdb-table',
        Item : {
            pk : { S : `MOVIE#tt${generateId(6)}` },
            sk : { S : 'DETAILS' },
            title : { S : movie.title },
            director : { S : movie.director },
            year : { N : movie.year.toString() }
        }
    });

    try {
        await client.send(command);
        return true;
    } catch(error) {
        console.log('Error from db:', error.message);
        return false;
    }
}