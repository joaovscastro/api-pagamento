/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('/criar-token', 'PixController.store')

Route.post('/criar-transacao', 'PixController.testedois')

Route.post('/boleto', 'PaymentsController.boleto')

Route.post('/pix', 'PaymentsController.pix')

Route.post('/configurar/:chave', 'PaymentsController.configurar')

Route.post('/webhook/pix', 'PaymentsController.webhook')

Route.get('/notificacao/:token', 'PaymentsController.getNotification')

Route.get('/webhook/:chave', 'PaymentsController.getWebhookpix')

Route.get('/webhooks', 'PaymentsController.listWebhook')
