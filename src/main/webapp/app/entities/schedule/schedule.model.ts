import { BaseEntity } from './../../shared';

export class Schedule implements BaseEntity {
    constructor(
        public id?: number,
        public room?: BaseEntity,
        public presentation?: BaseEntity,
    ) {
    }
}
