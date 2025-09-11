import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { sendResponse } from '../../responses/index.mjs';
import { validateReview } from '../../middlewares/validateReview.mjs';
import { errorHandler } from '../../middlewares/errorHandler.mjs';
import { addReview } from '../../services/reviews.mjs';

export const handler = middy(async (event) => {
  const result = await addReview(event.body);
  if(result) {
    return sendResponse(201, { success : true, message : 'Review added successfully', review : event.body });
  } else {
    return sendResponse(404, { success : false, message : 'Review could not be added' });
  }
}).use(httpJsonBodyParser())
  .use(validateReview())
  .use(errorHandler());