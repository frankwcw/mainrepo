const { faker } = require('@faker-js/faker')

const Fastify = require('fastify')
const fastify = Fastify()

fastify.register(require('@fastify/cors'), {
  // put your options here
})

const opts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          hello: {
            type: 'string'
          }
        }
      }
    }
  }
}
fastify.get('/', opts, async (request, reply) => {
  return { hello: 'world' }
})

fastify.listen(3001)

console.log(`
====================
fastify run http://localhost:3001
====================
`)






const Koa = require('koa')
const Router = require('@koa/router')
const koa = new Koa();
const router = new Router()

router.get('/', (ctx, next) => {
  ctx.body = { hello: 'world' }
});

koa
  .use(require('@koa/cors')())
  .use(router.routes())
  .listen(3002);

console.log(`
====================
koa run http://localhost:3002
====================
`)







const Express = require('express')
const express = Express()

express.use(require('cors')())

express.get('/', function (req, res) {
  res.send({ hello: 'world' })
})

express.listen(3003)

console.log(`
====================
express run http://localhost:3003
====================
`)
