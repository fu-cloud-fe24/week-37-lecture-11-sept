import middy from '@middy/core';
import { sendResponse } from '../../responses/index.mjs';

export const handler = middy(async (event) => {
  return sendResponse(200, { message : 'Hello from DeleteReview!' });
});
