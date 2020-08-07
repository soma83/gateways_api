import {Entity, hasMany, model, property} from '@loopback/repository';
import {Device} from './device.model';

@model()
export class Gateway extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    index: {
      unique: true,
    },
  })
  serial: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      pattern: '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
    }
  })
  ipaddress: string;

  @hasMany(() => Device)
  devices: Device[];

  constructor(data?: Partial<Gateway>) {
    super(data);
  }
}

export interface GatewayRelations {
  // describe navigational properties here
}

export type GatewayWithRelations = Gateway & GatewayRelations;
