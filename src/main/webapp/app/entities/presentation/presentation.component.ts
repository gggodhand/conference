import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { Presentation } from './presentation.model';
import { PresentationService } from './presentation.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-presentation',
    templateUrl: './presentation.component.html'
})
export class PresentationComponent implements OnInit, OnDestroy {
presentations: Presentation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private presentationService: PresentationService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.presentationService.query().subscribe(
            (res: ResponseWrapper) => {
                this.presentations = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPresentations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Presentation) {
        return item.id;
    }
    registerChangeInPresentations() {
        this.eventSubscriber = this.eventManager.subscribe('presentationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
