import { BaseEntity } from './../../shared';

export class Schedule implements BaseEntity {
    constructor(
        public id?: number,
        public startTime?: any,
        public endTime?: any,
        public room?: BaseEntity,
        public presentation?: BaseEntity,
    ) {
    }
}
