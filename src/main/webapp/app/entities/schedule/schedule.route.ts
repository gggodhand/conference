import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ScheduleComponent } from './schedule.component';
import { ScheduleDetailComponent } from './schedule-detail.component';
import { SchedulePopupComponent } from './schedule-dialog.component';
import { ScheduleDeletePopupComponent } from './schedule-delete-dialog.component';

export const scheduleRoute: Routes = [
    {
        path: 'schedule',
        component: ScheduleComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_PRESENTER'],
            pageTitle: 'conferenceApp.schedule.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'schedule/:id',
        component: ScheduleDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_PRESENTER'],
            pageTitle: 'conferenceApp.schedule.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const schedulePopupRoute: Routes = [
    {
        path: 'schedule-new',
        component: SchedulePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_PRESENTER'],
            pageTitle: 'conferenceApp.schedule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'schedule/:id/edit',
        component: SchedulePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_PRESENTER'],
            pageTitle: 'conferenceApp.schedule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'schedule/:id/delete',
        component: ScheduleDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_PRESENTER'],
            pageTitle: 'conferenceApp.schedule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
