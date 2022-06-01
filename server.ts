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
import { join } from 'path'
import { readFileSync } from 'fs'
import { createServer } from 'https'
import { Ignitor } from '@adonisjs/core/build/src/Ignitor'

sourceMapSupport.install({ handleUncaughtExceptions: false })

const httpsOptions: any = {
  cert: readFileSync(join(__dirname + '/sslCert/certificate.crt')), // Certificado fullchain do dominio
  key: readFileSync(join(__dirname + '/sslCert/private.key')), // Chave privada do domínio
  ca: readFileSync(join(__dirname + '/sslCert/chain-pix-sandbox.cer')), // Certificado público da Gerencianet
  minVersion: 'TLSv1.2',
  requestCert: true,
  rejectUnauthorized: false, //Mantenha como false para que os demais endpoints da API não rejeitem requisições sem MTLS
}

new Ignitor(__dirname)
  .httpServer()
  .start((handle) => {
    return createServer(httpsOptions, handle)
  })
  .catch(console.error)
