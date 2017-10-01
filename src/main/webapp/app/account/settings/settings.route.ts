import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SettingsComponent } from './settings.component';

export const settingsRoute: Route = {
    path: 'settings',
    component: SettingsComponent,
    data: {
        authorities: ['ROLE_LISTENER'],
        pageTitle: 'global.menu.account.settings'
    },
    canActivate: [UserRouteAccessService]
};
