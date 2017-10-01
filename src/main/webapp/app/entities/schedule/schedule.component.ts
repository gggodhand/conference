import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { Schedule } from './schedule.model';
import { ScheduleService } from './schedule.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-schedule',
    templateUrl: './schedule.component.html'
})
export class ScheduleComponent implements OnInit, OnDestroy {
schedules: Schedule[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private scheduleService: ScheduleService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.scheduleService.query().subscribe(
            (res: ResponseWrapper) => {
                this.schedules = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSchedules();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Schedule) {
        return item.id;
    }
    registerChangeInSchedules() {
        this.eventSubscriber = this.eventManager.subscribe('scheduleListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
