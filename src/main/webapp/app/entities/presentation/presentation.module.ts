import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConferenceSharedModule } from '../../shared';
import { ConferenceAdminModule } from '../../admin/admin.module';
import {
    PresentationService,
    PresentationPopupService,
    PresentationComponent,
    PresentationDetailComponent,
    PresentationDialogComponent,
    PresentationPopupComponent,
    PresentationDeletePopupComponent,
    PresentationDeleteDialogComponent,
    presentationRoute,
    presentationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...presentationRoute,
    ...presentationPopupRoute,
];

@NgModule({
    imports: [
        ConferenceSharedModule,
        ConferenceAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PresentationComponent,
        PresentationDetailComponent,
        PresentationDialogComponent,
        PresentationDeleteDialogComponent,
        PresentationPopupComponent,
        PresentationDeletePopupComponent,
    ],
    entryComponents: [
        PresentationComponent,
        PresentationDialogComponent,
        PresentationPopupComponent,
        PresentationDeleteDialogComponent,
        PresentationDeletePopupComponent,
    ],
    providers: [
        PresentationService,
        PresentationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConferencePresentationModule {}
