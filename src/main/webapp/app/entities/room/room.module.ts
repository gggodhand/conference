import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConferenceSharedModule } from '../../shared';
import {
    RoomService,
    RoomPopupService,
    RoomComponent,
    RoomDetailComponent,
    RoomDialogComponent,
    RoomPopupComponent,
    RoomDeletePopupComponent,
    RoomDeleteDialogComponent,
    roomRoute,
    roomPopupRoute,
} from './';

const ENTITY_STATES = [
    ...roomRoute,
    ...roomPopupRoute,
];

@NgModule({
    imports: [
        ConferenceSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        RoomComponent,
        RoomDetailComponent,
        RoomDialogComponent,
        RoomDeleteDialogComponent,
        RoomPopupComponent,
        RoomDeletePopupComponent,
    ],
    entryComponents: [
        RoomComponent,
        RoomDialogComponent,
        RoomPopupComponent,
        RoomDeleteDialogComponent,
        RoomDeletePopupComponent,
    ],
    providers: [
        RoomService,
        RoomPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConferenceRoomModule {}
