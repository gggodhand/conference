import { BaseEntity } from './../../shared';

export class Room implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public schedules?: BaseEntity[],
    ) {
    }
}
