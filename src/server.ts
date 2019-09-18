import express from 'express';
const app = express();
const rp = require('request-promise');
import Retry from './retry';

app.get('/login', async (request: express.Request, response: express.Response) => {
  const resultsList: string[] = [];
  const urlList = [
    `http://localhost:3002/login1?status=false`,
    `http://localhost:3002/login2?status=false`,
    `http://localhost:3002/login3?status=false`,
    `http://localhost:3002/login4?status=false`
  ];
  try {
    const retry = new Retry(4);
    await retry
      .setErrorHandler((err: any) => {
        resultsList.push(err.error);
        console.log(`Error: ${err}`);
      })
      .start(async (index: number) => {
        const response = await rp({
          uri: urlList[index],
        })
        resultsList.push(response);
        return response;
      });
    response.send(getFormattedResult(resultsList));
  } catch (e) {
    response.status(400).send(getFormattedResult(resultsList));
  }
});

const getFormattedResult = (resultsList: string[]) => resultsList.join(', ');

export default app;
