import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Schedule } from './schedule.model';
import { SchedulePopupService } from './schedule-popup.service';
import { ScheduleService } from './schedule.service';
import { Room, RoomService } from '../room';
import { Presentation, PresentationService } from '../presentation';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-schedule-dialog',
    templateUrl: './schedule-dialog.component.html'
})
export class ScheduleDialogComponent implements OnInit {

    schedule: Schedule;
    isSaving: boolean;

    rooms: Room[];

    presentations: Presentation[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private scheduleService: ScheduleService,
        private roomService: RoomService,
        private presentationService: PresentationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.roomService.query()
            .subscribe((res: ResponseWrapper) => { this.rooms = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.presentationService.query()
            .subscribe((res: ResponseWrapper) => { this.presentations = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.schedule.id !== undefined) {
            this.subscribeToSaveResponse(
                this.scheduleService.update(this.schedule));
        } else {
            this.subscribeToSaveResponse(
                this.scheduleService.create(this.schedule));
        }
    }

    private subscribeToSaveResponse(result: Observable<Schedule>) {
        result.subscribe((res: Schedule) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Schedule) {
        this.eventManager.broadcast({ name: 'scheduleListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    trackRoomById(index: number, item: Room) {
        return item.id;
    }

    trackPresentationById(index: number, item: Presentation) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-schedule-popup',
    template: ''
})
export class SchedulePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private schedulePopupService: SchedulePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.schedulePopupService
                    .open(ScheduleDialogComponent as Component, params['id']);
            } else {
                this.schedulePopupService
                    .open(ScheduleDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
