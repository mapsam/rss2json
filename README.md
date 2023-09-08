# rss <img src="public/rssimg.png" width="20"> 2 <img src="public/jsonimg.png" width="20"> json 

API for converting an RSS XML feed into JSON. Originally a replacement for the deprecated Google Feed API. 

## Usage

```
https://rssjson.vercel.app/api?url=<feed>
```

Examples

* steam: https://rssjson.vercel.app/api?url=https://store.steampowered.com/feeds/news.xml
* nyt: https://rssjson.vercel.app/api?url=https://rss.nytimes.com/services/xml/rss/nyt/Europe.xml

## Develop

```shell
npm i
npm start # localhost:5000
```

## Deploy

Deploys automatically on the `main` branch using [Vercel](https://vercel.com).