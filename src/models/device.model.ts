import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Gateway} from './gateway.model';

@model()
export class Device extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  uid: number;

  @property({
    type: 'string',
    required: true,
  })
  vendor: string;

  @property({
    type: 'date',
    required: true,
  })
  datecreated: string;

  @property({
    type: 'boolean',
    default: false,
  })
  active?: boolean;

  @belongsTo(() => Gateway)
  gatewayId: string;

  constructor(data?: Partial<Device>) {
    super(data);
  }
}

export interface DeviceRelations {
  // describe navigational properties here
}

export type DeviceWithRelations = Device & DeviceRelations;
