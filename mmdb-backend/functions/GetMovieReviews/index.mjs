import middy from '@middy/core';
import { sendResponse } from '../../responses/index.mjs';
import { getMovieReviews } from '../../services/reviews.mjs';


export const handler = middy(async (event) => {
  const reviews = await getMovieReviews(event.pathParameters.id);
  if(reviews) {
    return sendResponse(200, { success : true, reviews });
  } else {
    return sendResponse(404, { success : false, message : 'Reviews could not be found' });
  }
});
