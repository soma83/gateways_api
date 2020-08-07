import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Gateway,
  Device,
} from '../models';
import {GatewayRepository} from '../repositories';

export class GatewayDeviceController {
  constructor(
    @repository(GatewayRepository) protected gatewayRepository: GatewayRepository,
  ) { }

  @get('/gateways/{id}/devices', {
    responses: {
      '200': {
        description: 'Array of Gateway has many Device',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Device)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Device>,
  ): Promise<Device[]> {
    return this.gatewayRepository.devices(id).find(filter);
  }

  @post('/gateways/{id}/devices', {
    responses: {
      '200': {
        description: 'Gateway model instance',
        content: {'application/json': {schema: getModelSchemaRef(Device)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Gateway.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Device, {
            title: 'NewDeviceInGateway',
            exclude: ['id'],
            optional: ['gatewayId']
          }),
        },
      },
    }) device: Omit<Device, 'id'>,
  ): Promise<Device> {
    return this.gatewayRepository.devices(id).create(device);
  }

  @patch('/gateways/{id}/devices', {
    responses: {
      '200': {
        description: 'Gateway.Device PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Device, {partial: true}),
        },
      },
    })
    device: Partial<Device>,
    @param.query.object('where', getWhereSchemaFor(Device)) where?: Where<Device>,
  ): Promise<Count> {
    return this.gatewayRepository.devices(id).patch(device, where);
  }

  @del('/gateways/{id}/devices', {
    responses: {
      '200': {
        description: 'Gateway.Device DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Device)) where?: Where<Device>,
  ): Promise<Count> {
    return this.gatewayRepository.devices(id).delete(where);
  }
}
