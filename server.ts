/*
|--------------------------------------------------------------------------
| AdonisJs Server
|--------------------------------------------------------------------------
|
| The contents in this file is meant to bootstrap the AdonisJs application
| and start the HTTP server to accept incoming connections. You must avoid
| making this file dirty and instead make use of `lifecycle hooks` provided
| by AdonisJs service providers for custom code.
|
*/

import 'reflect-metadata'
import sourceMapSupport from 'source-map-support'
import { Ignitor } from '@adonisjs/core/build/standalone'
import { createServer } from 'https'
import fs from 'fs'

const httpsOptions: any = {
  cert: fs.readFileSync('./certificate.crt'), // Certificado fullchain do dominio
  key: fs.readFileSync('./private.key'), // Chave privada do domínio
  ca: fs.readFileSync('./chain-pix-sandbox.cer'), // Certificado público da Gerencianet
  minVersion: 'TLSv1.2',
  requestCert: true,
  rejectUnauthorized: false, //Mantenha como false para que os demais endpoints da API não rejeitem requisições sem MTLS
}

sourceMapSupport.install({ handleUncaughtExceptions: false })

new Ignitor(__dirname)
  .httpServer()
  .start((handle) => {
    return createServer(httpsOptions, handle)
  })
  .catch(console.error)
