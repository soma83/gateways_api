import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Device,
  Gateway,
} from '../models';
import {DeviceRepository} from '../repositories';

export class DeviceGatewayController {
  constructor(
    @repository(DeviceRepository)
    public deviceRepository: DeviceRepository,
  ) { }

  @get('/devices/{id}/gateway', {
    responses: {
      '200': {
        description: 'Gateway belonging to Device',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Gateway)},
          },
        },
      },
    },
  })
  async getGateway(
    @param.path.string('id') id: typeof Device.prototype.id,
  ): Promise<Gateway> {
    return this.deviceRepository.gateway(id);
  }
}
