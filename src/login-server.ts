import express from 'express';
import url from 'url';
const app = express();

function callback(req: express.Request, res: express.Response) {
  const urlStr = url.parse(req.url).pathname;
  if (req.query.status === 'true') {
    res.send(`${urlStr}: OK`);
  } else {
    res.status(400).send(`${urlStr}: Error`);
  }
}

app.get('/login1', callback);
app.get('/login2', callback);
app.get('/login3', callback);
app.get('/login4', callback);
app.get('/login5', callback);

export default app;