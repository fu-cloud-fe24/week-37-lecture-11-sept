import { client } from './client.mjs';
import { PutItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';

export const addReview = async (review) => {
    const commandForMovie = new PutItemCommand({
        TableName : 'mmdb-table',
        Item : {
            pk : { S : `MOVIE#${review.movieId}` },
            sk : { S : `REVIEW#USER#${review.username}` },
            rating : { N : review.rating.toString() },
            text : { S : review.text }
        }
    });
    
    const commandForUser = new PutItemCommand({
        TableName : 'mmdb-table',
        Item : {
            pk : { S : `USER#${review.username}` },
            sk : { S : `REVIEW#MOVIE#${review.movieId}` },
            rating : { N : review.rating.toString() },
            text : { S : review.text }
        }
    });

    try {
        await client.send(commandForMovie);
        await client.send(commandForUser);
        return true;
    }catch(error) {
        console.log('ERROR in db:', error.message);
        return false;
    }
}

export const getMovieReviews = async (id) => {
    const command = new QueryCommand({
        TableName : 'mmdb-table',
        KeyConditionExpression : 'pk = :pk AND begins_with(sk, :sk)',
        ExpressionAttributeValues : {
            ':pk' : { S : `MOVIE#${id}`},
            ':sk' : { S : 'REVIEW' }
        }
    });

    try {
        const { Items } = await client.send(command);
        const reviews = Items.map(item => unmarshall(item));
        return reviews;
    } catch(error) {
        console.log('ERROR in db:', error.message);
        return false;
    }
}

export const getUserReviews = async (username) => {
    const command = new QueryCommand({
        TableName : 'mmdb-table',
        KeyConditionExpression : 'pk = :pk AND begins_with(sk, :sk)',
        ExpressionAttributeValues : {
            ':pk' : { S : `USER#${username}`},
            ':sk' : { S : 'REVIEW' }
        }
    });

    try {
        const { Items } = await client.send(command);
        const reviews = Items.map(item => unmarshall(item));
        return reviews;
    } catch(error) {
        console.log('ERROR in db:', error.message);
        return false;
    }
}