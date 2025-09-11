import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { sendResponse } from '../../responses/index.mjs';
import { validateMovie } from '../../middlewares/validateMovie.mjs';
import { errorHandler } from '../../middlewares/errorHandler.mjs';
import { addMovie } from '../../services/movies.mjs';

export const handler = middy(async (event) => {
  const result = await addMovie(event.body);
  if(result) {
    return sendResponse(201, { success : true, message : 'Movie added successfully', movie : event.body });
  } else {
    return sendResponse(404, { success : false, message : 'Movie could not be added' });
  }
}).use(httpJsonBodyParser())
  .use(validateMovie())
  .use(errorHandler());
