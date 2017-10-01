import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PresentationComponent } from './presentation.component';
import { PresentationDetailComponent } from './presentation-detail.component';
import { PresentationPopupComponent } from './presentation-dialog.component';
import { PresentationDeletePopupComponent } from './presentation-delete-dialog.component';

export const presentationRoute: Routes = [
    {
        path: 'presentation',
        component: PresentationComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_PRESENTER'],
            pageTitle: 'conferenceApp.presentation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'presentation/:id',
        component: PresentationDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_PRESENTER'],
            pageTitle: 'conferenceApp.presentation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const presentationPopupRoute: Routes = [
    {
        path: 'presentation-new',
        component: PresentationPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_PRESENTER'],
            pageTitle: 'conferenceApp.presentation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'presentation/:id/edit',
        component: PresentationPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_PRESENTER'],
            pageTitle: 'conferenceApp.presentation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'presentation/:id/delete',
        component: PresentationDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_PRESENTER'],
            pageTitle: 'conferenceApp.presentation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
