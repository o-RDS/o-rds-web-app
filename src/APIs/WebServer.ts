// import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import json from 'koa-json';
import http from 'http';

// TODO: imports now work, but trying to use them causes breaking runtime errors
// const app = new express();
const Koa = require('koa');

const app = new Koa();
const router = new Router();

const PORT: number = 8080;

export default function listen() {
    app.use(router.routes()).use(router.allowedMethods());
    // http.createServer(app.callback()).listen(PORT);
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    })
}