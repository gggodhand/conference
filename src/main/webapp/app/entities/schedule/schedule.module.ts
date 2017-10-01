import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConferenceSharedModule } from '../../shared';
import {
    ScheduleService,
    SchedulePopupService,
    ScheduleComponent,
    ScheduleDetailComponent,
    ScheduleDialogComponent,
    SchedulePopupComponent,
    ScheduleDeletePopupComponent,
    ScheduleDeleteDialogComponent,
    scheduleRoute,
    schedulePopupRoute,
} from './';

const ENTITY_STATES = [
    ...scheduleRoute,
    ...schedulePopupRoute,
];

@NgModule({
    imports: [
        ConferenceSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ScheduleComponent,
        ScheduleDetailComponent,
        ScheduleDialogComponent,
        ScheduleDeleteDialogComponent,
        SchedulePopupComponent,
        ScheduleDeletePopupComponent,
    ],
    entryComponents: [
        ScheduleComponent,
        ScheduleDialogComponent,
        SchedulePopupComponent,
        ScheduleDeleteDialogComponent,
        ScheduleDeletePopupComponent,
    ],
    providers: [
        ScheduleService,
        SchedulePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConferenceScheduleModule {}
