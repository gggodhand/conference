import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Presentation } from './presentation.model';
import { PresentationService } from './presentation.service';

@Component({
    selector: 'jhi-presentation-detail',
    templateUrl: './presentation-detail.component.html'
})
export class PresentationDetailComponent implements OnInit, OnDestroy {

    presentation: Presentation;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private presentationService: PresentationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPresentations();
    }

    load(id) {
        this.presentationService.find(id).subscribe((presentation) => {
            this.presentation = presentation;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPresentations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'presentationListModification',
            (response) => this.load(this.presentation.id)
        );
    }
}
