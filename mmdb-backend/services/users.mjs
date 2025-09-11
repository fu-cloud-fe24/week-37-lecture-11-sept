import { client } from './client.mjs';
import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import { hashPassword } from '../utils/bcrypt.mjs';

export const registerUser = async (user) => {
    const command = new PutItemCommand({
        TableName : 'mmdb-table',
        Item : {
            pk : { S : `USER#${user.username}` },
            sk : { S : 'DETAILS' },
            password : { S : await hashPassword(user.password) },
            email : { S : user.email ? user.email : '' }
        }
    });

    try {
        await client.send(command);
        return true;
    } catch(error) {
        console.log('ERROR in db:', error.message);
        return false;
    }
}