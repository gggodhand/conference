import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { RoomComponent } from './room.component';
import { RoomDetailComponent } from './room-detail.component';
import { RoomPopupComponent } from './room-dialog.component';
import { RoomDeletePopupComponent } from './room-delete-dialog.component';

export const roomRoute: Routes = [
    {
        path: 'room',
        component: RoomComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'conferenceApp.room.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'room/:id',
        component: RoomDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'conferenceApp.room.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const roomPopupRoute: Routes = [
    {
        path: 'room-new',
        component: RoomPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'conferenceApp.room.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'room/:id/edit',
        component: RoomPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'conferenceApp.room.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'room/:id/delete',
        component: RoomDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'conferenceApp.room.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
