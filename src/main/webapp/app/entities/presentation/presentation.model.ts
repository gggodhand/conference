import { BaseEntity, User } from './../../shared';

export class Presentation implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public category?: string,
        public startTime?: any,
        public endTime?: any,
        public users?: User[],
    ) {
    }
}
