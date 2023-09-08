import express from 'express';
import got from 'got';
import { parseString } from 'xml2js';

const app = express();

async function parse(xml) {
  return new Promise((resolve, reject) => {
    parseString(xml, (err, parsed) => {
      if (err) return reject(err);
      return resolve(parsed);
    });
  });
}

app.set('port', (process.env.PORT || 3000));
app.get('/api', async(req, res, next) => {
  if (!req.query.url) {
    res.status(400);
    return res.json({message: 'url parameter not found'});
  }

  const { body, statusCode } = await got(req.query.url, { followRedirect: true, maxRedirects: 100 });

  if (statusCode !== 200) {
    res.status(422);
    return res.json({ message: 'unable to fetch url', code: response.statusCode });
  }

  const result = await parse(body);
  res.setHeader('Cache-Control', 's-max-age=60, stale-while-revalidate');
  return res.json(result);
});

export default app;
