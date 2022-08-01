const { faker } = require('@faker-js/faker')

const createResponse = () => {
  return Array.from({ length: 100 }).map(() => ({
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
    // users: Array.from({ length: 10 }).map(() => ({
    //   userId: faker.datatype.uuid(),
    //   username: faker.internet.userName(),
    //   email: faker.internet.email(),
    // })),
  }))
}

const response = createResponse()

const Fastify = require('fastify')
const fastify = Fastify()

fastify.register(require('@fastify/cors'), {
  // put your options here
})

const opts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            userId: { type: 'string' },
            username: { type: 'string' },
            email: { type: 'string' },
            avatar: { type: 'string' },
            password: { type: 'string' },
            birthdate: { type: 'string' },
            registeredAt: { type: 'string' },
            // users: {
            //   type: 'array',
            //   items: {
            //     type: 'object',
            //     properties: {
            //       userId: { type: 'string' },
            //       username: { type: 'string' },
            //       email: { type: 'string' },
            //     },
            //   }
            // }
          }
        }
      }
    }
  }
}
// fastify.get('/', async (request, reply) => {
//   return createResponse()
// })
fastify.get('/', opts, async (request, reply) => {
  return response
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
  ctx.body = response
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
  res.send(response)
})

express.listen(3003)

console.log(`
====================
express run http://localhost:3003
====================
`)
