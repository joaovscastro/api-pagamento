'use strict'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Gerencianet from 'gn-api-sdk-typescript'

const https = require('https')
import axios from 'axios'
var fs = require('fs')

//Insira o caminho de seu certificado .p12 dentro de seu projeto
var certificado = fs.readFileSync('./certificado.p12')

//Insira os valores de suas credenciais em desenvolvimento do pix
var credenciais = {
  client_id: 'Client_Id_423ad82df6b37d9a55897d69149eaffcd5040462',
  client_secret: 'Client_Secret_58d2aac4c65b661be0b45e6f396ce1eb13ecb854',
}

var data = JSON.stringify({ grant_type: 'client_credentials' })
var dataCredentials = credenciais.client_id + ':' + credenciais.client_secret

// Codificando as credenciais em base64
var auth = Buffer.from(dataCredentials).toString('base64')

const agent = new https.Agent({
  pfx: certificado,
  passphrase: '',
})

export default class PixController {
  // Criar token
  public async store({ response }: HttpContextContract) {
    try {
      // var config = {
      //   method: 'POST',
      //   url: 'https://api-pix-h.gerencianet.com.br/oauth/token',
      //   headers: {
      //     'Authorization': 'Basic ' + auth,
      //     'Content-Type': 'application/json',
      //   },
      //   httpsAgent: agent,
      //   data: data,
      // }
      // axios(config)
      //   .then(function (response) {
      //     console.log(JSON.stringify(response.data))
      //     return response
      //   })
      //   .catch(function (error) {
      //     console.log(error)
      //   })

      // const responseData = await axios.post('https://api-pix-h.gerencianet.com.br/oauth/token', {
      //   headers: {
      //     'Authorization': 'Basic ' + auth,
      //     'Content-Type': 'application/json',
      //   },
      //   httpsAgent: agent,
      //   data: data,
      // })

      const httpsAgent = agent

      const headers = {
        'Authorization': 'Basic ' + auth,
        'Content-Type': 'application/json',
      }

      const dataT = await axios.post('https://api-pix-h.gerencianet.com.br/oauth/token', data, {
        httpsAgent,
        headers,
      })

      return dataT.data
    } catch (err) {
      console.log(err)
      return response.status(400).send({ message: 'Não foi possível exibir o usuário!' })
    }
  }

  // Criar cobranca pix
  public async cobranca({ response }: HttpContextContract) {
    try {
      const httpsAgent = agent

      const headers = {
        'Authorization': 'Basic ' + auth,
        'Content-Type': 'application/json',
      }

      const dataT = await axios.post('https://api-pix-h.gerencianet.com.br/oauth/token', data, {
        httpsAgent,
        headers,
      })

      return dataT.data
    } catch (err) {
      console.log(err)
      return response.status(400).send({ message: 'Não foi possível exibir o usuário!' })
    }
  }

  // Criar conraça
  public async criarCobranca({ response }: HttpContextContract) {
    try {
      const httpsAgent = agent

      const headers = {
        'authorization': `Bearer sdsd`,
        'Content-Type': 'application/json',
      }

      const payload = {
        items: [
          {
            name: 'Teste API',
            value: 3000,
            amoun: 1,
          },
        ],
      }

      const dataT = await axios.post('https://sandbox.gerencianet.com.br/v1/charge', payload, {
        headers,
        httpsAgent,
      })

      return dataT.data
    } catch (err) {
      console.log(err)
      return response.status(400).send(err)
    }
  }

  // Teste
  public async teste({}: HttpContextContract) {
    const body = {
      items: [
        {
          name: 'Product 1',
          value: 1000,
          amount: 2,
        },
      ],
      shippings: [
        {
          name: 'Default Shipping Cost',
          value: 100,
        },
      ],
    }

    const gerencianet = Gerencianet({
      sandbox: true,
      client_id: 'Client_Id_423ad82df6b37d9a55897d69149eaffcd5040462',
      client_secret: 'Client_Secret_58d2aac4c65b661be0b45e6f396ce1eb13ecb85',
      pix_cert: './certificado.p12',
    })

    gerencianet
      .createCharge({}, body)
      .then((resposta: any) => {
        console.log(resposta)
      })
      .catch((error: any) => {
        console.log(error)
      })
      .done()
  }

  // Teste
  public async testedois({}: HttpContextContract) {
    const certificate = fs.readFileSync('./certificado.p12')
    const data = JSON.stringify({
      items: [
        {
          name: 'Product 1',
          value: 1000,
          amount: 2,
        },
      ],
    })

    const agent = new https.Agent({
      pfx: certificate,
      passphrase: '',
    })

    const config = {
      method: 'POST',
      url: 'https://sandbox.gerencianet.com.br/v1/charge',
      headers: {
        'Authorization': 'Bearer f38469e9-17b1-4fe3-8b67-476a659cae58',
        'Content-type': 'application/json',
      },
      httpsAgent: agent,
      data: data,
    }

    const result = await axios(config)

    return result.data
  }
}
