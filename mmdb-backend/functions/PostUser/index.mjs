import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { sendResponse } from '../../responses/index.mjs';
import { validateUser } from '../../middlewares/validateUser.mjs';
import { errorHandler } from '../../middlewares/errorHandler.mjs';
import { registerUser } from '../../services/users.mjs';

export const handler = middy(async (event) => {
  const result = await registerUser(event.body);
  if(result) {
    return sendResponse(201, { success : true, message : 'User created successfully!' });
  } else {
    return sendResponse(404, { success : false, message : 'User could not be created!' });
  }
}).use(httpJsonBodyParser())
  .use(validateUser())
  .use(errorHandler());
