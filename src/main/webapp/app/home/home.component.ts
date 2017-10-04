import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager, JhiAlertService} from 'ng-jhipster';

import { Account, LoginModalService, Principal } from '../shared';
import {RoomService} from '../entities/room/room.service';
import {Room} from '../entities/room/room.model';
import {ResponseWrapper} from '../shared/model/response-wrapper.model';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.css'
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    rooms: Room[];

    constructor(
        private roomService: RoomService,
        private alertService: JhiAlertService,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });

        this.roomService.queryWithPresentations().subscribe(
            (res: ResponseWrapper) => {
                this.rooms = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );

        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
