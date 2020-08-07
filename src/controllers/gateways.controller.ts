import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Gateway} from '../models';
import {GatewayRepository} from '../repositories';

export class GatewaysController {
  constructor(
    @repository(GatewayRepository)
    public gatewayRepository : GatewayRepository,
  ) {}

  @post('/gateways', {
    responses: {
      '200': {
        description: 'Gateway model instance',
        content: {'application/json': {schema: getModelSchemaRef(Gateway)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gateway, {
            title: 'NewGateway',
            exclude: ['id'],
          }),
        },
      },
    })
    gateway: Omit<Gateway, 'id'>,
  ): Promise<Gateway> {
    return this.gatewayRepository.create(gateway);
  }

  @get('/gateways/count', {
    responses: {
      '200': {
        description: 'Gateway model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Gateway) where?: Where<Gateway>,
  ): Promise<Count> {
    return this.gatewayRepository.count(where);
  }

  @get('/gateways', {
    responses: {
      '200': {
        description: 'Array of Gateway model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Gateway, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Gateway) filter?: Filter<Gateway>,
  ): Promise<Gateway[]> {
    return this.gatewayRepository.find(filter);
  }

  @patch('/gateways', {
    responses: {
      '200': {
        description: 'Gateway PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gateway, {partial: true}),
        },
      },
    })
    gateway: Gateway,
    @param.where(Gateway) where?: Where<Gateway>,
  ): Promise<Count> {
    return this.gatewayRepository.updateAll(gateway, where);
  }

  @get('/gateways/{id}', {
    responses: {
      '200': {
        description: 'Gateway model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Gateway, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Gateway, {exclude: 'where'}) filter?: FilterExcludingWhere<Gateway>
  ): Promise<Gateway> {
    return this.gatewayRepository.findById(id, filter);
  }

  @patch('/gateways/{id}', {
    responses: {
      '204': {
        description: 'Gateway PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gateway, {partial: true}),
        },
      },
    })
    gateway: Gateway,
  ): Promise<void> {
    await this.gatewayRepository.updateById(id, gateway);
  }

  @put('/gateways/{id}', {
    responses: {
      '204': {
        description: 'Gateway PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() gateway: Gateway,
  ): Promise<void> {
    await this.gatewayRepository.replaceById(id, gateway);
  }

  @del('/gateways/{id}', {
    responses: {
      '204': {
        description: 'Gateway DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.gatewayRepository.deleteById(id);
  }
}
