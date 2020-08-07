import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Device, DeviceRelations, Gateway} from '../models';
import {GatewaysMongoDbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {GatewayRepository} from './gateway.repository';

export class DeviceRepository extends DefaultCrudRepository<
  Device,
  typeof Device.prototype.id,
  DeviceRelations
> {

  public readonly gateway: BelongsToAccessor<Gateway, typeof Device.prototype.id>;

  constructor(
    @inject('datasources.gatewaysMongoDB') dataSource: GatewaysMongoDbDataSource, @repository.getter('GatewayRepository') protected gatewayRepositoryGetter: Getter<GatewayRepository>,
  ) {
    super(Device, dataSource);
    this.gateway = this.createBelongsToAccessorFor('gateway', gatewayRepositoryGetter,);
    this.registerInclusionResolver('gateway', this.gateway.inclusionResolver);
  }
}
