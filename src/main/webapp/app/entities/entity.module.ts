import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ConferenceRoomModule } from './room/room.module';
import { ConferencePresentationModule } from './presentation/presentation.module';
import { ConferenceScheduleModule } from './schedule/schedule.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ConferenceRoomModule,
        ConferencePresentationModule,
        ConferenceScheduleModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConferenceEntityModule {}
