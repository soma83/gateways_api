import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Gateway, GatewayRelations, Device} from '../models';
import {GatewaysMongoDbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {DeviceRepository} from './device.repository';

export class GatewayRepository extends DefaultCrudRepository<
  Gateway,
  typeof Gateway.prototype.id,
  GatewayRelations
> {

  public readonly devices: HasManyRepositoryFactory<Device, typeof Gateway.prototype.id>;

  constructor(
    @inject('datasources.gatewaysMongoDB') dataSource: GatewaysMongoDbDataSource, @repository.getter('DeviceRepository') protected deviceRepositoryGetter: Getter<DeviceRepository>,
  ) {
    super(Gateway, dataSource);
    this.devices = this.createHasManyRepositoryFactoryFor('devices', deviceRepositoryGetter,);
    this.registerInclusionResolver('devices', this.devices.inclusionResolver);
  }
}
