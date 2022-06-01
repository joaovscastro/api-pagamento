import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'
import Gerencianet from 'gn-api-sdk-typescript'
import options from '../../../config'

export default class PaymentsController {
  public async boleto({ response }: HttpContextContract) {
    const body = {
      payment: {
        banking_billet: {
          expire_at: '2022-06-01',
          customer: {
            name: 'Gorbadoc Oldbuck',
            email: 'oldbuck@gerencianet.com.br',
            cpf: '94271564656',
            birth: '1977-01-15',
            phone_number: '5144916523',
          },
        },
      },

      items: [
        {
          name: 'Produto Teste 4 hook',
          value: 1000,
          amount: 1,
        },
      ],
      // shippings: [
      //   {
      //     name: 'Default Shipping Cost',
      //     value: 100,
      //   },
      // ],
      metadata: {
        custom_id: '0987',
        notification_url: 'http://api.webhookinbox.com/i/WeyDutU6/in/',
      },
    }

    const gerencianet = Gerencianet(options)

    try {
      const pagamento = await gerencianet.oneStep([], body)

      return pagamento
    } catch (err) {
      console.log(err)
      return response.status(400).send({ message: 'Não foi possível gerar cobrança!' })
    }
  }

  public async pix({ response }: HttpContextContract) {
    const body = {
      calendario: {
        expiracao: 3600,
      },
      devedor: {
        cpf: '94271564656',
        nome: 'Gorbadock Oldbuck',
      },
      valor: {
        original: '123.45',
      },
      chave: 'd515044f-c6bb-4553-a72a-b746019e7e8e', // Informe sua chave Pix cadastrada na Gerencianet
      infoAdicionais: [
        {
          nome: 'Pagamento em',
          valor: 'NOME DO SEU ESTABELECIMENTO',
        },
        {
          nome: 'Pedido',
          valor: 'NUMERO DO PEDIDO DO CLIENTE',
        },
      ],
    }

    const params = {
      txid: 'dt9BHlyzrb5jrFNAdfEDmDbVqVxdVpHgiO',
    }

    const gerencianet = Gerencianet(options)

    try {
      const pagamento = await gerencianet.pixCreateImmediateCharge(params, body)

      return pagamento
    } catch (err) {
      console.log(err)
      return response.status(400).send({ message: 'Não foi possível gerar cobrança!' })
    }
  }

  public async configurar({ response, params }: HttpContextContract) {
    // Validar Mtls?
    options['validateMtls'] = true

    const body = {
      webhookUrl: 'https://pagamento.goatspace.co/webhook',
    }

    const gerencianet = Gerencianet(options)

    try {
      const pagamento = await gerencianet.pixConfigWebhook(params.chave, body)

      return pagamento
    } catch (err) {
      console.log(err)
      return response.status(400).send({ message: 'Não foi possível gerar cobrança!' })
    }
  }

  public async webhook({ request }: HttpContextContract) {
    const data = request.all()

    Logger.info('A info message')

    console.log(data)

    return data
  }

  public async webhookpix({ request }: HttpContextContract) {
    const data = request.all()

    Logger.info('A info message')

    console.log(data)

    return data
  }

  public async getNotification({ params }: HttpContextContract) {
    const gerencianet = Gerencianet(options)

    console.log(params.token)

    const pagamento = await gerencianet.getNotification(params.token)

    return pagamento
  }

  public async getWebhookpix({ params }: HttpContextContract) {
    const gerencianet = Gerencianet(options)

    console.log(params.chave)

    const pagamento = await gerencianet.pixDetailWebhook(params.chave)

    return pagamento
  }

  public async listWebhook({}: HttpContextContract) {
    const gerencianet = Gerencianet(options)

    const params = {
      inicio: '2022-01-22T16:01:35Z',
      fim: '2022-06-01T20:10:00Z',
    }

    const pagamento = await gerencianet.pixListWebhook(params)

    return pagamento
  }
}
